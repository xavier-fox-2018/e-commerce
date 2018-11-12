const router = require('express').Router(),
      CartCont = require('../controllers/cart'),
      { authenticate, authorize} = require('../middlewares/auth')

router
    .post('/', authenticate, authorize, CartCont.create)
    .get('/', authenticate, authorize, CartCont.getCart)
    .delete('/', authenticate, authorize, CartCont.remove)


module.exports = router