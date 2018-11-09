const express = require('express');
const router = express.Router();
const { ProductController } = require('../controllers')
const multer = require('multer');
const crypto = require('crypto')
const path = require('path')
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, callback) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return callback(err);
      callback(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});
const upload = multer({
  storage: storage
});

/* GET users listing. */
router.get('/', ProductController.getProduct)
router.post('/', upload.single('productpic'), ProductController.addProduct);
router.delete('/:id', ProductController.deleteProduct)
router.get('/categories', ProductController.getCategory)
router.post('/categories/add', ProductController.addCategory);

module.exports = router;
