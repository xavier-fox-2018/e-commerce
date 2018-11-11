const route = require('express').Router()
const StoreController = require('../controllers/store')
const isLogin = require('../middlewares/isLogin')
const isAdmin = require('../middlewares/isAdmin')

// Customer
route.get('/item', StoreController.getItems)
route.post('/item/:id/stock', StoreController.updateStock)
route.get('/category', StoreController.getCategories)
route.get('/category/:categoryId', StoreController.searchByCategory)

// Admin
route.post('/item', isLogin, isAdmin, StoreController.addItem)
route.put('/item/:id', isLogin, isAdmin, StoreController.updateItem)
route.delete('/item/:id', isLogin, isAdmin, StoreController.deleteItem)

route.post('/category', isLogin, isAdmin, StoreController.addCategory)
route.delete('/category/:categoryId', isLogin, isAdmin, StoreController.deleteCategory)

module.exports = route
