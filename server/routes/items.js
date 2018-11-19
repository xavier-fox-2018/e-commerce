var express = require('express');
var router = express.Router();
const {show, add, edit, softDelete, find, getItemByCategory, search, editWithImage} = require('../controllers/items')
const GCS = require('../helpers/GCSupload')
const {isLogin, isAdmin} = require('../middleware/auth')

router.get('/', show)
router.post('/', isLogin, isAdmin, GCS.multer.single('image'), GCS.sendUploadToGCS, add)
router.put('/:id', isLogin, isAdmin, edit)
router.put('/image/:id', isLogin, isAdmin, GCS.multer.single('image'), GCS.sendUploadToGCS, editWithImage)
router.put('/softDelete/:id', isLogin, isAdmin, softDelete)
router.get('/:id', find)
router.get('/category/:id', getItemByCategory)
router.get('/search/:q', search)

module.exports = router