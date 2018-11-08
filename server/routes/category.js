const router = require('express').Router()
const categoryController = require('../controllers/categoryController.js')
 
router.get('/', categoryController.read) 
router.post('/', categoryController.create)
router.get('/:categoryID', categoryController.findCategory)
// router.put('/:categoryID', categoryController.update)
// router.delete('/:categoryID', categoryController.delete)

 
module.exports = router