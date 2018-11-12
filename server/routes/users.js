var express = require('express');
var router = express.Router();
var userController = require('../controllers/users') 

/* GET users listing. */
router.post('/register', userController.addUsers);
router.post('/login',userController.login)

module.exports = router;
