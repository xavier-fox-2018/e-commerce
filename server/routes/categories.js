var express = require('express');
var router = express.Router();
const {show, add, edit, remove } = require('../controllers/categories')
const {isLogin, isAdmin } = require('../middleware/auth')

router.get('/', show)
router.post('/', isLogin, isAdmin, add)
router.put('/:id', isLogin, isAdmin, edit)
router.delete('/:id', isLogin, isAdmin, remove)

module.exports = router


