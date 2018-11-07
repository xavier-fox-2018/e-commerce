var express = require('express');
var router = express.Router();
const CategoryController = require('../controllers/categoryController.js')
const isAdmin = require('../middlewares/isAdmin.js')
const auth = require('../middlewares/auth')

router.post('/', auth.isAdmin, CategoryController.create);
router.get('/', CategoryController.show);
router.delete('/:id', auth.isAdmin, CategoryController.delete);
router.put('/:id', auth.isAdmin, CategoryController.update)


module.exports = router;
