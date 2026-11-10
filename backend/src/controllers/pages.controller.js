const pageService = require('../services/page.service');

function list(_req, res, next) {
  try {
    res.status(200).json(pageService.listPages());
  } catch (error) {
    next(error);
  }
}

function getBySlug(req, res, next) {
  try {
    const page = pageService.getPage(req.params.slug);
    if (!page) return res.status(404).json({ error: 'Page not found' });
    return res.status(200).json(page);
  } catch (error) {
    return next(error);
  }
}

module.exports = { list, getBySlug };
