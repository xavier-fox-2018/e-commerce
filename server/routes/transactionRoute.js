const router = require('express').Router()
const controller = require('../controllers/transactionController')
const middleware = require('../middlewares/index')

router.post('/',middleware.authenticate,controller.create)
router.get('/',middleware.authenticate,middleware.isAdmin,controller.read)
router.get('/my',middleware.authenticate,controller.mytransaction)
router.get('/:id',middleware.authenticate,middleware.isAdmin,controller.readOne)

module.exports = router;