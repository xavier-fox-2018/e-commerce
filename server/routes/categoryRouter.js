const categoryRouter = require('express').Router();
const CategoryController = require('../controllers/categoryController.js');
const isLogin = require('../middlewares/isLogin.js');
const isAdmin = require('../middlewares/isAdmin.js');

categoryRouter.post('/', isLogin, isAdmin, CategoryController.create);
categoryRouter.get('/:id', isLogin, CategoryController.getOne);
categoryRouter.get('/', isLogin, CategoryController.getAll);
categoryRouter.put('/:id', isLogin, isAdmin, CategoryController.update);
categoryRouter.delete('/:id', isLogin, isAdmin, CategoryController.delete);

module.exports = categoryRouter;