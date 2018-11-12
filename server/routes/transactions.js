const express = require('express');
const router = express.Router();
const {TransactionController} = require('../controllers')
const {isLogin, isAdmin} = require('../middlewares')


router.get('/', isLogin, isAdmin, TransactionController.getAll)
router.get('/:id', isLogin, isAdmin, TransactionController.getById)

module.exports = router