import fs from "fs"
import { notFound } from "next/navigation"
import { getAllMdxFiles, getSidebarNav, NavItem } from "../../lib/content"
import path from "path"
import { PageNavigation } from "../components/PageNavigation"
import { CopyLinkButton } from "../components/CopyLinkButton"

export async function generateStaticParams() {
  const files = getAllMdxFiles()
  return files.map(file => ({
    slug: file.slug.length === 0 ? [] : file.slug,
  }))
}

interface FlatNavItem {
  title: string;
  href: string;
  category: string | null;
}

function getFlatNav(nav: NavItem[], currentCategory: string | null = null): FlatNavItem[] {
  let flat: FlatNavItem[] = [];
  for (const item of nav) {
    if (item.items) {
      flat = flat.concat(getFlatNav(item.items, item.title));
    } else {
      flat.push({
        title: item.title,
        href: item.href,
        category: currentCategory,
      });
    }
  }
  return flat;
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug || []
  const files = getAllMdxFiles()
  
  const file = files.find(f => {
    if (f.slug.length !== slug.length) return false;
    return f.slug.every((s, i) => s === slug[i]);
  });

  if (!file) {
    notFound()
  }

  const contentDir = path.join(process.cwd(), 'content')
  const relativePath = path.relative(contentDir, file.filePath).replace(/\\/g, '/')

  let Content;
  try {
    Content = (await import(`../../content/${relativePath}`)).default
  } catch (e) {
    console.error("Failed to load MDX file", relativePath, e)
    notFound()
  }

  const nav = getSidebarNav()
  const currentPath = slug.length > 0 ? '/' + slug.join('/') : '/'
  
  const flatNav = getFlatNav(nav)
  const currentIndex = flatNav.findIndex(item => item.href === currentPath)
  
  const prevPage = currentIndex > 0 ? flatNav[currentIndex - 1] : null
  const nextPage = currentIndex !== -1 && currentIndex < flatNav.length - 1 ? flatNav[currentIndex + 1] : null
  const categoryTitle = currentIndex !== -1 ? flatNav[currentIndex].category : null

  return (
    <article className="max-w-none pb-16 animate-fade-in-up">
      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {categoryTitle ? (
          <div className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            {categoryTitle}
          </div>
        ) : (
          <div />
        )}
        <div className="self-start sm:self-auto">
          <CopyLinkButton />
        </div>
      </div>
      <Content />
      <PageNavigation prev={prevPage} next={nextPage} />
    </article>
  )
}
