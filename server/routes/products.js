const express = require('express');
const router = express.Router();
const {ProductController} = require('../controllers')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, callback) {  
            callback(null, file.fieldname + '-' + new Date() + '.png');
    }
});
const upload = multer({
    storage:storage
}); 

/* GET users listing. */
router.get('/', ProductController.getProduct)
router.post('/', upload.single('productpic'), ProductController.addProduct);
router.post('/category/add', ProductController.addCategory);

module.exports = router;
