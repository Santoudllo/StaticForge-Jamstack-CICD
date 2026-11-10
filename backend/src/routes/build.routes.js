const express = require('express');
const controller = require('../controllers/build.controller');

const router = express.Router();
router.post('/', controller.build);
router.get('/status', controller.status);

module.exports = router;
