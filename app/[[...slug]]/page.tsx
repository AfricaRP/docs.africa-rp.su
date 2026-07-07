import fs from "fs"
import { notFound } from "next/navigation"
import { getAllMdxFiles, getSidebarNav, NavItem } from "../../lib/content"
import path from "path"
import { PageNavigation } from "../components/PageNavigation"
import { CopyLinkButton } from "../components/CopyLinkButton"
import { Breadcrumbs } from "../components/Breadcrumbs"

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
  categoryHref: string | null;
}

function getFlatNav(nav: NavItem[], currentCategory: string | null = null, currentCategoryHref: string | null = null): FlatNavItem[] {
  let flat: FlatNavItem[] = [];
  for (const item of nav) {
    if (item.items) {
      flat = flat.concat(getFlatNav(item.items, item.title, item.href));
    } else {
      flat.push({
        title: item.title,
        href: item.href,
        category: currentCategory,
        categoryHref: currentCategoryHref,
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
  
  const currentItem = currentIndex !== -1 ? flatNav[currentIndex] : null;
  const breadcrumbItems = [];
  
  if (currentItem && currentItem.category) {
    breadcrumbItems.push({ title: currentItem.category });
  }
  if (currentItem) {
    breadcrumbItems.push({ title: currentItem.title, href: currentItem.href });
  }

  return (
    <article className="max-w-none pb-16 animate-fade-in-up relative">
      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 mb-2">
        {breadcrumbItems.length > 0 ? (
          <Breadcrumbs items={breadcrumbItems} />
        ) : (
          <div />
        )}
        <div className="self-start sm:self-auto mb-6 sm:mb-0">
          <CopyLinkButton />
        </div>
      </div>
      <Content />
      <PageNavigation prev={prevPage} next={nextPage} />
    </article>
  )
}
