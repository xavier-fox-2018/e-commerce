const router = require('express').Router()
const {  isLogin, isAuthorize, isTokenStillValid } = require('../midleware/authenticate')

const { read, create, update, destroy,  addItem, removeItem, addToCart, removeFromCart } = require('../controllers/controller-category')



router.get('/', read)
router.post('/',isLogin,isTokenStillValid,isAuthorize, create)
router.put('/:id',isLogin, isTokenStillValid,isAuthorize,update)
router.post('/:id',isLogin, isTokenStillValid,isAuthorize, addItem)
router.delete('/:id',isLogin, isTokenStillValid,isAuthorize, destroy)
router.delete('/remove-item/:id', isLogin , isAuthorize ,removeItem)
router.post('/add-item',isLogin,isTokenStillValid,isAuthorize, addItem)
router.put('/add-to-cart/:id',isLogin,isTokenStillValid, addToCart)
router.put('/remove-from-cart/:id',isLogin, isTokenStillValid,removeFromCart)



module.exports = router