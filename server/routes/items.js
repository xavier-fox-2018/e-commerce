var express = require('express');
var router = express.Router();
var Item = require('../controllers/items.js')
var Middleware = require('../middlewares/index.js')
var multer = require('multer');
const images = require('../helpers/images');

router.post('/', Middleware.isLogin, Middleware.isAdmin, images.multer.single('image'), images.sendUploadToGCS, Item.createItem);
router.get('/', Item.getItems);
router.delete('/:id', Middleware.isLogin, Middleware.isAdmin, Item.deleteItem);
router.put('/:id', Middleware.isLogin, Middleware.isAdmin, images.multer.single('image'), images.sendUploadToGCS, Item.updateItem);
router.get('/:name', Item.search)
    // Middleware.isLogin, Middleware.isAdmin,

module.exports = router;