const router = require('express').Router()
const Controller = require('../controllers/user.js')
const isLogin = require('../middleware/isLogin.js')
const isAdmin = require('../middleware/isAdmin.js')

router.post('/signup', Controller.signUp)
router.post('/signin', Controller.signIn)

//CRUD admin
router.get('/admin', isLogin, isAdmin, Controller.getAdmin)
router.post('/admin/add', isLogin, isAdmin, Controller.addAdmin)
router.delete('/admin/delete', isLogin, isAdmin, Controller.deleteAdmin)
router.put('/admin/edit', isLogin, isAdmin, Controller.editAdmin)

module.exports = router