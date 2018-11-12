const express = require('express')
const Router = express.Router()

const {isLogin} = require('../middlewares/middleware')

const categoryRoutes = require('./category')
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')
const CategoryController = require('../controllers/CategoryController')
const CartController = require('../controllers/CartController')
const TransactioController = require('../controllers/TransactionController')

// Router.get('/categories', categoryRoutes)
Router.get('/categories', CategoryController.getAll)
Router.post('/categories/', CategoryController.create)
Router.delete('/categories/:id', CategoryController.delete)
Router.put('/categories/:id', CategoryController.update)






Router.get('/products', ProductController.getAll)
Router.get('/products/:id', ProductController.getProductCategory)
Router.post('/products', ProductController.create)
Router.get('/filterproducts/:name', ProductController.filterProducts)
Router.delete('/products/:id', ProductController.delete)



Router.post('/users/register', UserController.register)
Router.post('/users/login', UserController.login)




Router.post('/cart', isLogin, CartController.create)
Router.get('/cart', isLogin, CartController.getAll)

Router.post('/transactions', isLogin, TransactioController.create)
Router.get('/transactions', isLogin, TransactioController.getAll)





module.exports = Router