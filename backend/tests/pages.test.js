const request = require('supertest');
const app = require('../src/app');

describe('Pages API', () => {
  test('GET /api/pages returns Markdown pages metadata', async () => {
    const response = await request(app).get('/api/pages');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('slug');
    expect(response.body[0]).toHaveProperty('html');
  });

  test('GET /api/pages/:slug returns one page', async () => {
    const response = await request(app).get('/api/pages/welcome');
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Bienvenue dans le monde Jamstack');
  });

  test('unknown page returns 404', async () => {
    const response = await request(app).get('/api/pages/not-existing-page');
    expect(response.statusCode).toBe(404);
  });

  test('rejects unsafe slug', async () => {
    const response = await request(app).get('/api/pages/..%2Fpackage');
    expect([400, 404]).toContain(response.statusCode);
  });
});
