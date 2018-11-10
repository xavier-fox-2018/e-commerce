const cartRouter = require('express').Router();
const CartController = require('../controllers/cartController.js');
const isLogin = require('../middlewares/isLogin.js');

cartRouter.get('/', isLogin, CartController.getCart);
cartRouter.patch('/add/:id', isLogin, CartController.addItemToCart);
cartRouter.patch('/remove/:id', isLogin, CartController.removeItemFromCart);
// cartRouter.get('/empty', isLogin, CartController.emptyCart);

module.exports = cartRouter;