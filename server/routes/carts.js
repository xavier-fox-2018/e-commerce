var express = require('express');
var router = express.Router();
var Cart = require('../controllers/carts.js');
var Middleware = require('../middlewares/index.js');

router.post('/', Middleware.isLogin, Cart.addToCart);
router.get('/', Middleware.isLogin, Cart.getCarts);
router.post('/empty', Middleware.isLogin, Cart.emptyCart);
module.exports = router;