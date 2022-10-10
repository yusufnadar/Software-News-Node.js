const router = require('express').Router();
const newsController = require('../controllers/news');
const jwtMiddleware = require('../middlewares/jwt_verify');

router.get('/:page',jwtMiddleware,newsController.get);

module.exports = router;
