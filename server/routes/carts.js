var express = require('express');
var router = express.Router();
var Carts = require('../controllers/carts.js');

router.post('/addToCart', Carts.addToCart);

/* GET users listing. */
router.get('/', Carts.getCarts);

module.exports = router;