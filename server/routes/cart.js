const router = require('express').Router()
const cartController = require('../controllers/cartController.js')
 
router.get('/', cartController.read)
router.post('/', cartController.create)
// router.put('/:cartID', cartController.update)
// router.delete('/:cartID', cartController.delete)
// router.patch('/', cartController.patch) ????
 
module.exports = router