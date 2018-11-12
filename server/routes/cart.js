const router = require('express').Router()
const cartController = require('../controllers/cartController.js')
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const isAdmin = require('../middlewares/isAdmin.js')
 
router.get('/', isAdmin, cartController.readAll)
router.post('/', isAuthenticated, cartController.create)
router.get('/currentCart', isAuthenticated, cartController.readCurrentCart)
router.post('/addToCart', isAuthenticated, cartController.addToCart)

// router.put('/:cartID/removeFromCart', cartController.removeFromCart)
router.delete('/checkout', isAuthenticated, cartController.checkout) 

 
module.exports = router