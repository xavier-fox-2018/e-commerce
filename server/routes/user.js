const router = require('express').Router()
const userController = require('../controllers/userController.js')
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const isAdmin = require('../middlewares/isAdmin.js')

router.post('/register', userController.register)
router.post('/login', userController.login)


 
module.exports = router