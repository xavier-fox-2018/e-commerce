const express = require('express');
const router = express.Router();
const user = require('./users-router')
const product = require('./product-router')
const category = require('./category-router')
const cart = require('../routes/cart-route')
const upload = require('../helpers/multer')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Khairul Baharuddin');
});
router.use('/users', user)
router.use('/product', product)
router.use('/category', category)
router.use('/cart', cart)

router.post('/upload', upload.multer.single('image'), upload.sendUploadToGCS,
           (req, res) => {
      
    res.send({
        status: 200,
        message: 'Your file is successfully uploaded',
        link: req.file.cloudStoragePublicUrl
    })
})

module.exports = router;
