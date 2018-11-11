const router = require('express').Router()
const Controller = require('../controllers/category.js')
const isLogin = require('../middleware/isLogin.js')
const isAdmin = require('../middleware/isAdmin.js')

router.get('/', Controller.viewCategory)
router.post('/add', isLogin, isAdmin, Controller.addCategory)
router.delete('/delete', isLogin, isAdmin, Controller.deleteCategory)

module.exports = router