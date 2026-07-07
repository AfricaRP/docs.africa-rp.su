const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, '../content');
const publicDir = path.join(__dirname, '../public');
const searchFile = path.join(publicDir, 'search.json');

// Simple slugify function matching github-slugger/rehype-slug behavior
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-а-яА-ЯёЁ]+/g, '')
    .replace(/\-\-+/g, '-');
}

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
      
      let pageTitle = data.title;
      if (!pageTitle) {
        const h1Match = content.match(/^#\s+(.+)$/m);
        if (h1Match) {
          pageTitle = h1Match[1].trim();
        } else {
          pageTitle = nameWithoutNumber.replace(/_/g, ' ');
        }
      }
      
      const pageHref = '/' + finalSlug.join('/');

      // Split content by headings
      const lines = content.split('\n');
      let currentSection = {
        title: pageTitle,
        hash: '',
        content: []
      };
      
      const sections = [currentSection];

      // Exclude frontmatter lines and Code Hike lines
      let inCodeBlock = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith('```')) {
          inCodeBlock = !inCodeBlock;
          continue;
        }

        if (inCodeBlock) continue;

        // Match headings ## Title
        const headingMatch = line.match(/^(#{2,6})\s+(.+)$/);
        if (headingMatch) {
          const headingText = headingMatch[2].trim();
          // Create new section
          currentSection = {
            title: headingText,
            pageTitle: pageTitle, // Keep track of the page title
            hash: '#' + slugify(headingText),
            content: []
          };
          sections.push(currentSection);
          continue;
        }

        // Add line to current section
        currentSection.content.push(line);
      }

      // Process and clean up sections
      for (const sec of sections) {
        const rawContent = sec.content.join('\n');
        const cleanContent = rawContent
          .replace(/<[^>]*>?/gm, '')
          .replace(/[#*`_\[\]]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        if (cleanContent.length > 0 || sec.title === pageTitle) {
          results.push({
            title: sec.title,
            pageTitle: sec.pageTitle || null,
            href: pageHref + sec.hash,
            content: cleanContent
          });
        }
      }
    }
  }
  return results;
}

const docs = getAllMdxFiles(contentDir);
fs.writeFileSync(searchFile, JSON.stringify(docs));
console.log(`Generated search index with ${docs.length} entries.`);
