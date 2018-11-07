const express = require('express');
const router = express.Router();
const {UserController} = require('../controllers')

/* GET users listing. */
router.post('/', UserController.createUserLocal);
router.post('/login', UserController.loginUserLocal);
router.post('/oauth', UserController.loginUserGoogle);

module.exports = router;
