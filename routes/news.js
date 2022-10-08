const router = require('express').Router();
const newsController = require('../controllers/news');

router.get('/:page',newsController.get);

module.exports = router;
