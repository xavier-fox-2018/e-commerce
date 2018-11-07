const router = require('express').Router()
const controller =require('../controllers/cartController')
const middleware = require('../middlewares/index')

router.get('/',middleware.authenticate,controller.read)
router.post('/:id',middleware.authenticate,controller.addToCart)
router.delete('/:id',middleware.authenticate,controller.removeFromCart)

module.exports = router;