var express = require('express');
var router = express.Router();
var Customers = require('../controllers/customers.js')


router.post('/signup', Customers.signup)
router.post('/signin', Customers.signin)
router.post('/gsigin', Customers.gsignin)
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;