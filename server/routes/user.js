const router = require('express').Router()
const userController = require('../controllers/userController.js')
 
router.post('/register', userController.register)
router.post('/login', userController.login)
// router.post('/googleLogin', userController.googleLogin)
router.get('/', userController.readAllUsers)
router.delete('/:userID', userController.delete)
router.put('/:userID', userController.update)
router.put('/updateRole/:userID', userController.updateRole)

 
module.exports = router