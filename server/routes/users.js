const express = require('express');
const router = express.Router();
const {UserController} = require('../controllers')
const {TransactionController} = require('../controllers')
const {isLogin} = require('../middlewares')

/* GET users listing. */
router.post('/', UserController.createUserLocal);
router.post('/login', UserController.loginUserLocal);
router.get('/cart', isLogin, UserController.getCart)
router.patch('/cart', isLogin, UserController.addToCart)
router.patch('/cart/remove', isLogin, UserController.removeFromCart)
router.post('/cart/checkout', isLogin, UserController.checkout)
router.get('/cart/invoice', isLogin, TransactionController.getByUser)

module.exports = router;
