const router = require('express').Router()

const { isLogin, isTokenStillValid,isAuthorize } =require('../midleware/authenticate')

const { update, read } = require('../controllers/controller-item')

router.get('/', read)
router.put('/:id',isLogin, isTokenStillValid, isAuthorize, update)


module.exports = router