const router = require('express').Router()
const user = require('./user.js')
const cart = require('./cart.js')
const item = require('./item.js')
const category = require('./category.js')
 
// router.get('/', (req, res) => { 

// })
 
router.use('/user', user)
router.use('/item', item)
router.use('/category', category)
router.use('/cart', cart)
 
module.exports = router
