import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  items?: NavItem[];
}

const contentDir = path.join(process.cwd(), 'content');

export function getSidebarNav(): NavItem[] {
  if (!fs.existsSync(contentDir)) return [];
  
  function buildTree(dir: string, basePath: string = ''): NavItem[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    // Read meta.json if it exists
    let meta: Record<string, { title?: string, icon?: string }> = {};
    const metaPath = path.join(dir, 'meta.json');
    if (fs.existsSync(metaPath)) {
      try {
        meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
      } catch (e) {
        console.error('Error reading meta.json in', dir);
      }
    }
    
    return entries
      .filter(entry => entry.name !== 'meta.json')
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(entry => {
        const fullPath = path.join(dir, entry.name);
        const nameWithoutNumber = entry.name.replace(/^\d+-/, '').replace(/\.mdx?$/, '');
        let title = nameWithoutNumber.replace(/_/g, ' ');
        const slug = nameWithoutNumber.toLowerCase().replace(/_/g, '-').replace(/ /g, '-');
        const href = `${basePath}/${slug}`;
        
        let icon = meta[entry.name]?.icon || meta[nameWithoutNumber]?.icon;
        
        if (entry.isDirectory()) {
          // Override title if present in meta
          if (meta[entry.name]?.title) {
            title = meta[entry.name].title;
          } else if (meta[nameWithoutNumber]?.title) {
            title = meta[nameWithoutNumber].title;
          }
          
          return {
            title,
            href,
            icon,
            items: buildTree(fullPath, href)
          };
        } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
          // Игнорируем root index.mdx в самом меню, так как он обычно просто приветствие
          if (dir === contentDir && (entry.name === 'index.mdx' || entry.name === '00-index.mdx')) {
            return null;
          }
          
          // Parse frontmatter
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          
          if (data.title) {
            title = data.title;
          } else {
            // Ультимативное удобство: если нет frontmatter, ищем первый заголовок # H1
            const h1Match = content.match(/^#\s+(.+)$/m);
            if (h1Match) {
              title = h1Match[1].trim();
            }
          }
          
          if (data.icon) icon = data.icon;
          
          return {
            title,
            href,
            icon
          };
        }
        return null;
      })
      .filter((item): item is NavItem => item !== null);
  }
  
  return buildTree(contentDir);
}

export function getAllMdxFiles(): { slug: string[], filePath: string }[] {
  if (!fs.existsSync(contentDir)) return [];
  const files: { slug: string[], filePath: string }[] = [];
  
  function scan(dir: string, currentSlug: string[] = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const nameWithoutNumber = entry.name.replace(/^\d+-/, '').replace(/\.mdx?$/, '');
      const slugPart = nameWithoutNumber.toLowerCase().replace(/_/g, '-').replace(/ /g, '-');
      
      if (entry.isDirectory()) {
        scan(path.join(dir, entry.name), [...currentSlug, slugPart]);
      } else if (entry.name.endsWith('.mdx')) {
        let finalSlug = [...currentSlug, slugPart];
        // Если это файл index.mdx, он должен быть корнем папки
        if (entry.name === 'index.mdx' || entry.name === '00-index.mdx') {
          finalSlug = currentSlug; // пустой массив для корня или просто родительский slug
        }
        files.push({
          slug: finalSlug,
          filePath: path.join(dir, entry.name)
        });
      }
    }
  }
  
  scan(contentDir);
  return files;
}