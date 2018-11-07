const route = require('express').Router()
const StoreController = require('../controllers/store')

route.get('/item', StoreController.getItems)
route.post('/item', StoreController.addItem)
route.get('/category', StoreController.getCategories)
route.get('/category/:categoryId', StoreController.searchByCategory)

module.exports = route
