var express = require('express');
var router = express.Router();
var Category = require('../controllers/categories.js')
var Middleware = require('../middlewares/index.js')

router.post('/', Middleware.isLogin, Middleware.isAdmin, Category.createCategory);
router.get('/', Category.getCategory);
router.delete('/:id', Middleware.isLogin, Middleware.isAdmin, Category.deleteCategory);
router.put('/:id', Middleware.isLogin, Middleware.isAdmin, Category.updateCategory);
module.exports = router;