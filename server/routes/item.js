const router = require('express').Router()
const itemController = require('../controllers/itemController.js')
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const isAdmin = require('../middlewares/isAdmin.js')

 
router.get('/', itemController.read) 
router.post('/', itemController.create)
router.put('/:itemID', itemController.update)
router.delete('/:itemID', isAdmin, itemController.delete)
router.get('/:itemName', itemController.findItem)
 
module.exports = router