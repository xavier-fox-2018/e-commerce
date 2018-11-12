const router = require('express').Router()
const controller = require('../controllers/userController')
const middleware = require('../middlewares/index')

router.post('/register',middleware.emailUnique,controller.register)
router.post('/login',controller.login)

// router.post('/gsignin',controller.gsignin)

router.get('/',middleware.authenticate,controller.readOne)
router.get('/all',middleware.authenticate,controller.read)

module.exports = router