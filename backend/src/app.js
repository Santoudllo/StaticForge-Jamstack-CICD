const express = require('express');
const cors = require('cors');
const pagesRouter = require('./routes/pages.routes');
const buildRouter = require('./routes/build.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'staticforge-api' });
});

app.use('/api/pages', pagesRouter);
app.use('/api/build', buildRouter);

app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

module.exports = app;
