const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router.get('/login',UserController.login)
router.post('/admin/products',UserController.addProduct)
router.patch('/admin/products/edit/:_id',UserController.edit)
router.post('/admin/categories',UserController.addCategory)
router.delete('/admin/products/delete/:_id',UserController.delete)

module.exports = router


