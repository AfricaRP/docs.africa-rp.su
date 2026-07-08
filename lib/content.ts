import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  items?: NavItem[];
}

export interface FlatNavItem {
  title: string;
  href: string;
  category: string | null;
  categoryHref: string | null;
}

const contentDir = path.join(process.cwd(), "content");

let cachedNav: NavItem[] | null = null;
let cachedFlatNav: FlatNavItem[] | null = null;
let cachedMdxFiles: { slug: string[]; filePath: string }[] | null = null;

export function getSidebarNav(): NavItem[] {
  if (cachedNav) return cachedNav;
  if (!fs.existsSync(contentDir)) return [];

  function buildTree(dir: string, basePath: string = ""): NavItem[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    let meta: Record<string, { title?: string; icon?: string }> = {};
    const metaPath = path.join(dir, "meta.json");
    if (fs.existsSync(metaPath)) {
      try {
        meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      } catch (e) {}
    }

    return entries
      .filter((entry) => entry.name !== "meta.json")
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((entry) => {
        const fullPath = path.join(dir, entry.name);
        const nameWithoutNumber = entry.name
          .replace(/^\d+-/, "")
          .replace(/\.mdx?$/, "");
        let title = nameWithoutNumber.replace(/_/g, " ");
        const slug = nameWithoutNumber
          .toLowerCase()
          .replace(/_/g, "-")
          .replace(/ /g, "-");
        const href = `${basePath}/${slug}`;

        let icon = meta[entry.name]?.icon || meta[nameWithoutNumber]?.icon;

        if (entry.isDirectory()) {
          if (meta[entry.name]?.title) {
            title = meta[entry.name].title as string;
          } else if (meta[nameWithoutNumber]?.title) {
            title = meta[nameWithoutNumber].title as string;
          }

          return {
            title,
            href,
            icon,
            items: buildTree(fullPath, href),
          };
        } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
          if (
            dir === contentDir &&
            (entry.name === "index.mdx" || entry.name === "00-index.mdx")
          ) {
            return null;
          }

          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          if (data.title) {
            title = data.title;
          } else {
            const h1Match = content.match(/^#\s+(.+)$/m);
            if (h1Match) {
              title = h1Match[1].trim();
            }
          }

          if (data.icon) icon = data.icon;

          return {
            title,
            href,
            icon,
          };
        }
        return null;
      })
      .filter((item) => item !== null) as NavItem[];
  }

  cachedNav = buildTree(contentDir);
  return cachedNav;
}

export function getFlatNav(
  nav?: NavItem[],
  currentCategory: string | null = null,
  currentCategoryHref: string | null = null,
): FlatNavItem[] {
  if (!nav && cachedFlatNav) return cachedFlatNav;
  
  const navSource = nav || getSidebarNav();
  let flat: FlatNavItem[] = [];
  
  for (const item of navSource) {
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
  
  if (!nav) cachedFlatNav = flat;
  return flat;
}

export function getAllMdxFiles(): { slug: string[]; filePath: string }[] {
  if (cachedMdxFiles) return cachedMdxFiles;
  if (!fs.existsSync(contentDir)) return [];
  const files: { slug: string[]; filePath: string }[] = [];

  function scan(dir: string, currentSlug: string[] = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const nameWithoutNumber = entry.name
        .replace(/^\d+-/, "")
        .replace(/\.mdx?$/, "");
      const slugPart = nameWithoutNumber
        .toLowerCase()
        .replace(/_/g, "-")
        .replace(/ /g, "-");

      if (entry.isDirectory()) {
        scan(path.join(dir, entry.name), [...currentSlug, slugPart]);
      } else if (entry.name.endsWith(".mdx")) {
        let finalSlug = [...currentSlug, slugPart];
        if (entry.name === "index.mdx" || entry.name === "00-index.mdx") {
          finalSlug = currentSlug;
        }
        files.push({
          slug: finalSlug,
          filePath: path.join(dir, entry.name),
        });
      }
    }
  }

  scan(contentDir);
  cachedMdxFiles = files;
  return cachedMdxFiles;
}
