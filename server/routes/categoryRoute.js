const router = require('express').Router()
const controller = require('../controllers/categoryController')

router.post('/',controller.create)
router.get('/',controller.read)

module.exports = router;