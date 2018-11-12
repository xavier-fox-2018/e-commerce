const router = require('express').Router()

const {  isLogin, isAuthorize, isTokenStillValid, isTransactionValid } = require('../midleware/authenticate')

const { create , read} = require('../controllers/controller-transaction')

router.post('/:id',isLogin,isTokenStillValid, isTransactionValid, create)
router.get('/', isLogin, isTokenStillValid, read)



module.exports = router