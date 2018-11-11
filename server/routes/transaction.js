const route = require('express').Router()
const TransactionController = require('../controllers/transaction')

route.post('/', TransactionController.checkout)

module.exports = route
