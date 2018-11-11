
const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartControllers')
const auth = require('../middlewares/auth')
const TransactionController = require('../controllers/transactionControllers')

router.post('/', auth.isLogin, TransactionController.create);
// router.post('/', auth.isLogin, CartController.create);
// router.get('/', auth.isLogin, CartController.read);
// router.patch('/:id', auth.isLogin, CartController.removeItem);

module.exports = router;
