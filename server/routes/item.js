const express = require('express'),
      routes = express.Router(),
      ItemController = require('../controllers/item.js');

// READ
routes.get('/', ItemController.findAll) // ? finds all items
routes.get('/c/:itemCategory', ItemController.findByCategory) // ? finds item based on category
routes.get('/:id', ItemController.findOne) // ? finds just one item
// CREATE
routes.post('/', ItemController.create)
// UPDATE
routes.put('/:id', ItemController.update)
// DELETE
routes.delete('/:id', ItemController.delete)

module.exports = routes