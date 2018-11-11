const route = require('express').Router();

const ItemController = require('../controllers/item.js');

route.post('/', ItemController.create);
route.put('/:ItemId', ItemController.update);
route.delete('/:ItemId', ItemController.delete);
route.get('/', ItemController.getAll);

module.exports = route;