const router = require('express').Router()
const controller = require('../controllers/transactionController')
const middleware = require('../middlewares/index')

router.post('/',middleware.authenticate,controller.create)
router.get('/',controller.read)
router.get('/my',middleware.authenticate,controller.mytransaction)
router.get('/:id',controller.readOne)

module.exports = router;