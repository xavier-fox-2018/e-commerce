const express = require('express');
const router = express.Router();
const {isLogin, isAdmin} = require('../middlewares/isLogin')
const {addProduct, filterByCategory, editProduct, allProduct, deletePro, findOne} = require('../controllers/product-controller')
const upload = require('../helpers/multer')

router.post('/', isLogin, isAdmin, upload.multer.single('image'), upload.sendUploadToGCS ,addProduct)
router.put('/:id/editProduct',  editProduct)
router.delete('/:id', isLogin, isAdmin, deletePro)
router.get('/', allProduct)
router.get('/:category/products', filterByCategory)
router.get('/:id', isLogin, isAdmin, findOne)

module.exports = router;
