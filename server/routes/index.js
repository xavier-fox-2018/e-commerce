const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const verifyToken = require('../middleware/verifyToken.js')
const createToken = require('../middleware/createToken.js')
module.exports =router


router.post('/signIn', controller.signIn, verifyToken)
router.post('/register', controller.register, createToken)