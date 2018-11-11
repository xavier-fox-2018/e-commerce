const route = require('express').Router()
const StoreController = require('../controllers/store')
const isLogin = require('../middlewares/isLogin')
const isAdmin = require('../middlewares/isAdmin')

require('dotenv').config()
const multer = require('multer')
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larget than 5mb
  }
})

// Customer
route.get('/item', StoreController.getItems)
route.post('/item/:id/stock', StoreController.updateStock)
route.get('/category', StoreController.getCategories)
route.get('/category/:categoryId', StoreController.searchByCategory)

// Admin
route.post('/item', isLogin, isAdmin, StoreController.addItem)
route.put('/item/:id', isLogin, isAdmin, StoreController.updateItem)
route.delete('/item/:id', isLogin, isAdmin, StoreController.deleteItem)
route.post('/picture', isLogin, isAdmin, upload.single('picture'), StoreController.uploadImage)

route.post('/category', isLogin, isAdmin, StoreController.addCategory)
route.delete('/category/:categoryId', isLogin, isAdmin, StoreController.deleteCategory)

module.exports = route
