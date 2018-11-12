const route = require('express').Router()
const UserController = require('../controllers/user')

route.get('/', UserController.getUser)
route.post('/register', UserController.register)
route.post('/login', UserController.login)

module.exports = route