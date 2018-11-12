const router = require('express').Router(),
      TransactionCont = require('../controllers/transaction'),
      {authenticate, authorize} = require('../middlewares/auth')

router
    .post('/', authenticate, authorize, TransactionCont.create)


module.exports = router