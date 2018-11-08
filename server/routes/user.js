const express = require('express'),
      routes = express.Router(),
      UserController = require('../controllers/user.js');

// READ
routes.get('/', UserController.findAll) // ? finds all items
routes.get('/:id', UserController.findOne) // ? finds just one item
// CREATE
routes.post('/', UserController.create)
// UPDATE
routes.put('/:id', UserController.update)
// DELETE
routes.delete('/:id', UserController.delete)

module.exports = routes