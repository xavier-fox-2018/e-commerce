var express = require('express');
var router = express.Router();
const Controller = require('../controllers/user')
const User = require('../models/user')
const auth = require('../middlewares/authentication')
require('dotenv').config()

/* GET users listing. */

router.post('/login',  Controller.login)
router.post('/register', Controller.register)
router.post(`/register/admin`, Controller.registerAdmin)
router.get('/login/google', Controller.loginGoogle)

router.get('/', Controller.getAll)

module.exports = router;
