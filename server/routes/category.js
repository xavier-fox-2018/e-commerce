const route = require('express').Router();

const CategoryController = require('../controllers/category.js');

route.post('/', CategoryController.create);
route.put('/:CategoryId', CategoryController.update);
route.delete('/:CategoryId', CategoryController.delete);
route.get('/', CategoryController.getAll);

module.exports = route;