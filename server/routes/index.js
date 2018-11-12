const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const existToken = require('../middleware/existToken.js');
const verifyToken = require('../middleware/verifyToken');
const cartController = require('../controllers/cart');

module.exports =router
router.post('/signIn', existToken, userController.signIn)
router.post('/register', userController.register)
router.get('/main', verifyToken, userController.getUser)
router.post('/cart/update', verifyToken, cartController.update)
router.post('/cart/delete', verifyToken, cartController.deleteOne)
router.get('/cart/deleteAll', verifyToken, cartController.deleteAll)