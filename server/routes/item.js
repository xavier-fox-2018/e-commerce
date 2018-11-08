const router = require('express').Router()
const itemController = require('../controllers/itemController.js')
 
router.get('/', itemController.read) 
router.post('/', itemController.create)
router.put('/:itemID', itemController.update)
router.delete('/:itemID', itemController.delete)
router.get('/:itemName', itemController.findItem)
// router.patch('/', itemController.patch) ????
 
module.exports = router