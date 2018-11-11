const router = require('express').Router()
const Controller = require('../controllers/item.js')
const isLogin = require('../middleware/isLogin.js')
const isAdmin = require('../middleware/isAdmin.js')

router.get('/', Controller.getItems)
router.post('/add', isLogin, isAdmin, Controller.addItem)
router.put('/edit', isLogin, isAdmin, Controller.editItem)
router.delete('/delete', isLogin, isAdmin, Controller.deleteItem)
// router.post('/upload', Controller.uploadImg)

module.exports = router