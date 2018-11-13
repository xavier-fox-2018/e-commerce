var express = require('express');
var router = express.Router();
var Customer = require('../controllers/customers.js')
var Middleware = require('../middlewares/index.js')

router.post('/signup', Customer.signup)
router.post('/signin', Customer.signin)
router.post('/signinAdmin', Customer.signinAdmin)
router.get('/', Middleware.isLogin, Customer.getCustomer)

module.exports = router;