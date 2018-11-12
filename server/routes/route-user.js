const router = require('express').Router()
const { isLogin, isTokenStillValid,isAuthorize } =require('../midleware/authenticate')
const { gSignIn, signin, signup, findUser, createAdmin , readAdmin, deleteAdmin, updateAdmin} = require('../controllers/controller-user')

router.post('/gsignin', gSignIn)
router.post('/signin', signin)
router.post('/signup', signup)
router.get('/find-one', isLogin, findUser)
router.post('/create-admin',isLogin,isTokenStillValid,isAuthorize,createAdmin)
router.get('/read-admin',isLogin,isTokenStillValid,isAuthorize,readAdmin)
router.delete('/:id',isLogin,isTokenStillValid,isAuthorize,deleteAdmin)
router.put('/:id',isLogin, isTokenStillValid,isAuthorize, updateAdmin)
router.get('/find-user',isLogin,isTokenStillValid,findUser)



module.exports = router