const fs = require('fs');
const path = require('path');
const pageService = require('./page.service');

const outputDirectory = path.resolve(__dirname, '../../../public/generated');
let lastBuild = { status: 'never-run', generatedAt: null, pages: 0 };

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function renderPage(page) {
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(page.description)}">
  <title>${escapeHtml(page.title)} | StaticForge</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header"><a href="index.html">StaticForge</a></header>
  <main class="article">
    <a href="index.html">← Toutes les pages</a>
    <p class="eyebrow">${escapeHtml(page.date)}</p>
    <h1>${escapeHtml(page.title)}</h1>
    <p class="lead">${escapeHtml(page.description)}</p>
    <article>${page.html}</article>
  </main>
  <footer>Généré avec StaticForge · Jamstack</footer>
</body>
</html>`;
}

async function generateSite() {
  const pages = pageService.listPages();
  fs.rmSync(outputDirectory, { recursive: true, force: true });
  fs.mkdirSync(outputDirectory, { recursive: true });

  const cards = pages.map((page) => `
    <a class="page-card" href="${encodeURIComponent(page.slug)}.html">
      <span class="eyebrow">${escapeHtml(page.date)}</span>
      <h2>${escapeHtml(page.title)}</h2>
      <p>${escapeHtml(page.description)}</p>
      <span class="read-more">Lire l'article →</span>
    </a>`).join('\n');

  const home = `<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Un site statique généré avec StaticForge">
<title>StaticForge — Le journal</title><link rel="stylesheet" href="styles.css">
</head><body><header class="site-header"><a href="index.html">StaticForge</a><span>Le journal</span></header>
<main class="home"><p class="eyebrow">GÉNÉRATEUR JAMSTACK</p><h1>Des idées qui prennent<br><span>forme sur le web.</span></h1>
<p class="lead">Un site rapide, léger et pré-généré à partir de fichiers Markdown.</p>
<section class="page-grid">${cards}</section></main><footer>Propulsé par StaticForge · HTML statique</footer></body></html>`;

  fs.writeFileSync(path.join(outputDirectory, 'index.html'), home);
  fs.writeFileSync(path.join(outputDirectory, 'styles.css'), `
    *{box-sizing:border-box}body{margin:0;background:#f6f7fb;color:#182033;font-family:Inter,Arial,sans-serif;line-height:1.65}
    a{color:inherit;text-decoration:none}.site-header{height:76px;padding:0 max(calc((100% - 1080px)/2),24px);display:flex;align-items:center;justify-content:space-between;background:#101a33;color:white;font-weight:700}
    .home,.article{max-width:1080px;margin:0 auto;padding:76px 24px}.eyebrow{color:#6575a3;font-size:.75rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase}
    h1{font-size:clamp(2.7rem,7vw,5.5rem);line-height:1.04;letter-spacing:-.06em;margin:18px 0}h1 span{color:#596de5}.lead{color:#68718a;font-size:1.15rem;max-width:650px}
    .page-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin-top:56px}.page-card{display:block;background:white;padding:28px;border:1px solid #e6e9f2;border-radius:18px;transition:transform .2s,box-shadow .2s}
    .page-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px #17234a12}.page-card h2{line-height:1.2}.page-card p{color:#68718a}.read-more{color:#596de5;font-weight:700}
    .article{max-width:780px;background:white;margin-top:48px;border-radius:20px;padding:48px}.article h1{font-size:3rem}.article article{margin-top:40px}.article article h2{margin-top:2em}
    footer{text-align:center;padding:36px;color:#8991a7;border-top:1px solid #e6e9f2}
    @media(max-width:600px){.home,.article{padding:42px 20px}.article{margin:20px;border-radius:14px}.article h1{font-size:2.2rem}}
  `);

  pages.forEach((page) => {
    fs.writeFileSync(path.join(outputDirectory, `${page.slug}.html`), renderPage(page));
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${['index', ...pages.map((page) => page.slug)].map((slug) => `  <url><loc>/${slug === 'index' ? 'index' : slug}.html</loc></url>`).join('\n')}\n</urlset>`;
  fs.writeFileSync(path.join(outputDirectory, 'sitemap.xml'), sitemap);

  lastBuild = {
    status: 'success',
    generatedAt: new Date().toISOString(),
    pages: pages.length,
    outputDirectory: 'public/generated'
  };
  return lastBuild;
}

function getLastBuild() {
  return lastBuild;
}

module.exports = { generateSite, getLastBuild, renderPage, escapeHtml };
