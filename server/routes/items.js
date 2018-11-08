const router = require('express').Router()
const ItemController = require('../controllers/ItemController')

router.post('/', ItemController.create)
router.get('/', ItemController.index)
router.get('/:id', ItemController.show)
router.delete('/:id/delete', ItemController.delete)

module.exports = router