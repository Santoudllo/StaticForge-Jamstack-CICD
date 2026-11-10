const buildService = require('../services/build.service');

async function build(_req, res, next) {
  try {
    const result = await buildService.generateSite();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

function status(_req, res) {
  res.status(200).json(buildService.getLastBuild());
}

module.exports = { build, status };
