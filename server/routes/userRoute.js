const router = require('express').Router()
const controller = require('../controllers/userController')
const middleware = require('../middlewares/index')

router.post('/register',middleware.emailUnique,controller.register)
router.post('/login',controller.login)

router.get('/',middleware.authenticate,controller.readOne)

// admin
router.post('/',middleware.authenticate,middleware.isAdmin,controller.create)
router.get('/all',middleware.authenticate,middleware.isAdmin,controller.read)
router.put('/:id',middleware.authenticate,middleware.isAdmin,controller.update)
router.delete('/:id',middleware.authenticate,middleware.isAdmin,controller.delete)

module.exports = router