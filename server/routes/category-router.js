const express = require('express');
const router = express.Router();
const {addCategory, getAll} = require('../controllers/category-controller')
const {isLogin, isAdmin} = require('../middlewares/isLogin')

router.post('/addcategory', isLogin, isAdmin, addCategory)
router.get('/', getAll)

module.exports = router;
