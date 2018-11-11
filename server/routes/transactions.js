var express = require('express');
var router = express.Router();
var Transaction = require('../controllers/transactions.js');
var Middleware = require('../middlewares/index.js');

router.post('/', Middleware.isLogin, Transaction.createTransaction);
router.get('/', Middleware.isLogin, Transaction.getTransactions)
module.exports = router;