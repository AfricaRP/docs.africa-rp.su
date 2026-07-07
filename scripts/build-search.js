const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, '../content');
const publicDir = path.join(__dirname, '../public');
const searchFile = path.join(publicDir, 'search.json');

function getAllMdxFiles(dir, currentSlug = []) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const nameWithoutNumber = entry.name.replace(/^\d+-/, '').replace(/\.mdx?$/, '');
    const slugPart = nameWithoutNumber.toLowerCase().replace(/_/g, '-').replace(/ /g, '-');
    
    if (entry.isDirectory()) {
      results = results.concat(getAllMdxFiles(path.join(dir, entry.name), [...currentSlug, slugPart]));
    } else if (entry.name.endsWith('.mdx')) {
      let finalSlug = [...currentSlug, slugPart];
      if (entry.name === 'index.mdx' || entry.name === '00-index.mdx') {
        finalSlug = currentSlug;
      }
      
      const filePath = path.join(dir, entry.name);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      let title = data.title;
      if (!title) {
        const h1Match = content.match(/^#\s+(.+)$/m);
        if (h1Match) {
          title = h1Match[1].trim();
        } else {
          title = nameWithoutNumber.replace(/_/g, ' ');
        }
      }
      
      const cleanContent = content
        .replace(/```[\s\S]*?```/g, '')
        .replace(/<[^>]*>?/gm, '')
        .replace(/[#*`_\[\]]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      results.push({
        title,
        href: '/' + finalSlug.join('/'),
        content: cleanContent
      });
    }
  }
  return results;
}

const docs = getAllMdxFiles(contentDir);
fs.writeFileSync(searchFile, JSON.stringify(docs));
console.log(`Generated search index with ${docs.length} entries.`);
