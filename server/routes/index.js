const router = require('express').Router()
const user = require('./user.js')
const cart = require('./cart.js')
const item = require('./item.js')
const admin = require('./admin.js')
const category = require('./category.js')
 

 
router.use('/user', user)
router.use('/admin', admin)
router.use('/item', item)
router.use('/category', category)
router.use('/cart', cart)
 
module.exports = router
