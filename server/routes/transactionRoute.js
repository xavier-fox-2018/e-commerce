const router = require('express').Router()
const controller = require('../controllers/transactionController')
const middleware = require('../middlewares/index')

router.post('/',middleware.authenticate,controller.create)
router.get('/',middleware.authenticate,controller.read)

module.exports = router;