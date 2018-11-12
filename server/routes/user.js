const route = require('express').Router();

const UserController = require('../controllers/user.js');

route.get('/', UserController.getUser);
route.post('/signup', UserController.signup);
route.post('/login', UserController.login);
route.get('/isLogin', UserController.isLogin);
route.post('/cart', UserController.cart);

module.exports = route;