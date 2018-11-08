const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const verifyToken = require('../middleware/verifyToken.js')
const verifyGToken = require('../middleware/verifyGToken.js')
const createToken = require('../middleware/createToken.js')
module.exports =router

router.post('/gSignIn', verifyGToken)
router.post('/signIn', verifyToken, controller.signIn)
router.post('/register', controller.register, createToken)
router.post('/delete', controller.delete)