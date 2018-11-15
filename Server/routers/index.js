const  express = require('express')
const router = express.Router()
const userRouter = require('../routers/user')
const productRouter = require('../routers/product')
const categoryRouter = require('../routers/category')
const cartRouter = require('../routers/cart')


router.get('/')
router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/cart', cartRouter)

module.exports = router