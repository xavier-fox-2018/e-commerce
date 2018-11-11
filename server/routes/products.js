const express = require('express');
const router = express.Router();
const { ProductController } = require('../controllers')
const multer = require('multer');
const {isLogin, isAdmin} = require('../middlewares')

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

/* GET users listing. */
router.get('/', ProductController.getProduct)
router.post('/', isLogin, isAdmin, upload.single('productpic'), ProductController.addProduct);
router.put('/:id', isLogin, isAdmin, upload.single('productpic'), ProductController.editProduct)
router.delete('/:id', isLogin, isAdmin, ProductController.deleteProduct)
router.get('/categories', ProductController.getCategory)
router.post('/categories/add', isLogin, isAdmin, ProductController.addCategory);


module.exports = router;
