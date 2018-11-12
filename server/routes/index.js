var express = require('express');
var router = express.Router();
var stockRouter = require('./stock')
var users = require('./users')

/* GET home page. */
router.use('/stock', stockRouter);
router.use('/user',users)

module.exports = router;
