
const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartControllers');
const isAdmin = require('../middlewares/isAdmin.js')
const auth = require('../middlewares/auth')

router.post('/', auth.isLogin, CartController.create);
router.get('/', auth.isLogin, CartController.read);
router.patch('/:id', auth.isLogin, CartController.removeItem);
router.delete('/:id', auth.isLogin, CartController.delete)

module.exports = router;
