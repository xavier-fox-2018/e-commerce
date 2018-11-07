const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const {Controller} = require('../controllers');
/* GET home page. */

router.get('/', Controller.home);

router.use('/users', usersRouter);

module.exports = router;
