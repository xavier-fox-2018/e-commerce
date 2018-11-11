const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const productsRouter = require('./products')
const transactionsRouter = require('./transactions')
const {Controller} = require('../controllers');
/* GET home page. */

router.get('/', Controller.home);
router.use('/users', usersRouter);
router.use('/products', productsRouter)
router.use('/transactions', transactionsRouter)

module.exports = router;
