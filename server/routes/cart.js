const router = require('express').Router()
const Controller = require('../controllers/cart.js')

router.post('/', Controller.getCart)
router.post('/addto', Controller.addtoCart)
router.delete('/removefrom', Controller.removefromCart)
router.delete('/checkout', Controller.checkout)


module.exports = router