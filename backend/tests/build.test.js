const fs = require('fs');
const path = require('path');
const buildService = require('../src/services/build.service');

describe('Static site generation', () => {
  const output = path.resolve(__dirname, '../../../public/generated');

  afterAll(() => {
    fs.rmSync(output, { recursive: true, force: true });
  });

  test('generates homepage, article pages, stylesheet and sitemap', async () => {
    const result = await buildService.generateSite();
    expect(result.status).toBe('success');
    expect(result.pages).toBeGreaterThan(0);
    expect(fs.existsSync(path.join(output, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(output, 'welcome.html'))).toBe(true);
    expect(fs.existsSync(path.join(output, 'styles.css'))).toBe(true);
    expect(fs.existsSync(path.join(output, 'sitemap.xml'))).toBe(true);
  });

  test('escapes HTML special characters in metadata', () => {
    expect(buildService.escapeHtml('<script>')).toBe('&lt;script&gt;');
  });
});
