const router = require('express').Router()
const categoryController = require('../controllers/categoryController.js')
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const isAdmin = require('../middlewares/isAdmin.js')

router.get('/', categoryController.read) 
router.post('/', categoryController.create)
router.get('/:categoryID', categoryController.findCategory)

 
module.exports = router