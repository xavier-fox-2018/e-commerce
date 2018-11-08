var express = require('express');
var router = express.Router();
const {register, getUser, glogin, login, addToCart, removeFromCart} = require('../controllers/users')
const {isLogin} = require('../middleware/auth')

router.get('/', isLogin, getUser )
router.post('/', register)
router.post('/login', login)
router.post('/glogin', glogin)
router.post('/cart/plus', isLogin, addToCart)
router.post('/cart/min', isLogin, removeFromCart)

module.exports = router;
