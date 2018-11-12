const router = require('express').Router()
const stockController = require('../controllers/stock')

router.get('/view',stockController.viewAll)
router.post('/add',stockController.addItem)
router.get('/view/:category',stockController.byCategory)
router.put('/update/:id',stockController.update)
router.delete('/remove/:id',stockController.remove)
module.exports = router