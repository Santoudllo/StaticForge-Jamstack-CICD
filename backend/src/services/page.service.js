const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const contentDirectory = path.resolve(__dirname, '../../content');

function safeSlug(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function listPages() {
  return fs.readdirSync(contentDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = path.basename(file, '.md');
      const source = fs.readFileSync(path.join(contentDirectory, file), 'utf8');
      const parsed = matter(source);
      return {
        slug,
        title: parsed.data.title || slug,
        description: parsed.data.description || '',
        date: parsed.data.date || '',
        html: marked.parse(parsed.content)
      };
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function getPage(slug) {
  if (!safeSlug(slug)) return null;
  const filePath = path.join(contentDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const parsed = matter(fs.readFileSync(filePath, 'utf8'));
  return {
    slug,
    title: parsed.data.title || slug,
    description: parsed.data.description || '',
    date: parsed.data.date || '',
    html: marked.parse(parsed.content)
  };
}

module.exports = { listPages, getPage };
