const express = require('express');
const router = express.Router();
const {isLogin} =require('../middlewares/isLogin')
const {addToCart} = require('../controllers/product-controller')


// router.post('/', addToCart)




module.exports = router