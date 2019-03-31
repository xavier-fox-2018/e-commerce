const router = require('express').Router()
const userController = require('../controllers/userController.js')
const isAuthenticated = require('../middlewares/isAuthenticated.js') 
const isAdmin = require('../middlewares/isAdmin.js') 


router.post('/login', userController.login)
router.put('/updateRole/:userID', isAdmin, userController.updateRole)
router.get('/allUsers', isAdmin, userController.readAllUsers)
router.delete('/:userID', isAuthenticated, userController.delete)
router.put('/:userID', isAuthenticated, userController.update)


 
module.exports = router