const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const contentDir = path.join(__dirname, '../content');

// Helper to ask questions
const ask = (query) => new Promise((resolve) => rl.question(`\x1b[36m? \x1b[0m${query}`, resolve));

async function main() {
  console.log('\n\x1b[32m🚀 Утилита создания новой статьи AfricaRP\x1b[0m\n');

  // 1. Get Categories
  if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir);
  const items = fs.readdirSync(contentDir, { withFileTypes: true });
  const categories = items.filter(i => i.isDirectory()).map(i => i.name);
  
  let targetDir = contentDir;
  
  if (categories.length > 0) {
    console.log('\x1b[33mСуществующие категории:\x1b[0m');
    console.log('0. [В корень]');
    categories.forEach((cat, idx) => console.log(`${idx + 1}. ${cat}`));
    
    const catChoice = await ask('В какую категорию добавить? (введите номер или новое название): ');
    const num = parseInt(catChoice);
    
    if (!isNaN(num) && num === 0) {
      targetDir = contentDir;
    } else if (!isNaN(num) && num > 0 && num <= categories.length) {
      targetDir = path.join(contentDir, categories[num - 1]);
    } else if (catChoice.trim().length > 0) {
      // Сreate new category
      const newCatDir = path.join(contentDir, catChoice.trim().toLowerCase().replace(/\s+/g, '-'));
      if (!fs.existsSync(newCatDir)) fs.mkdirSync(newCatDir);
      targetDir = newCatDir;
    }
  }

  // 2. Get Title
  const title = await ask('Введите заголовок статьи: ');
  if (!title.trim()) {
    console.log('\x1b[31mЗаголовок не может быть пустым!\x1b[0m');
    process.exit(1);
  }

  // 3. Get Icon (Optional)
  const icon = await ask('Введите название иконки (Lucide) или оставьте пустым (напр. FileText): ');

  // 4. Generate Filename
  const slug = title.trim().toLowerCase().replace(/[^a-z0-9а-яё]+/g, '-').replace(/^-+|-+$/g, '');
  const filename = `${slug}.mdx`;
  const fullPath = path.join(targetDir, filename);

  if (fs.existsSync(fullPath)) {
    console.log('\x1b[31mФайл с таким именем уже существует!\x1b[0m');
    process.exit(1);
  }

  // 5. Write Content
  let content = '';
  if (icon.trim()) {
    content += `---\nicon: "${icon.trim()}"\n---\n\n`;
  }
  content += `# ${title.trim()}\n\nНачните писать здесь...\n`;

  fs.writeFileSync(fullPath, content, 'utf8');

  console.log(`\n\x1b[32m✅ Статья успешно создана!\x1b[0m`);
  console.log(`\x1b[90m📂 Путь: ${fullPath}\x1b[0m\n`);
  
  rl.close();
}

main().catch(console.error);
