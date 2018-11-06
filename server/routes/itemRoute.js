const router = require('express').Router()
const controller = require('../controllers/itemController')

router.get('/',controller.read)
router.get('/category/:id',controller.readByCategory)
router.get('/:id',controller.readOne)
router.post('/',controller.create)
router.put('/:id',controller.update)
router.delete('/:id',controller.delete)

module.exports = router