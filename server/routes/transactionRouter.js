const transactionRouter = require('express').Router();
const TransactionController = require('../controllers/transactionController.js');
const isLogin = require('../middlewares/isLogin.js');
const isAdmin = require('../middlewares/isAdmin.js');

transactionRouter.post('/', isLogin, TransactionController.create);
transactionRouter.get('/all', isLogin, isAdmin, TransactionController.getAll);
transactionRouter.get('/', isLogin, TransactionController.findByUser);

module.exports = transactionRouter;