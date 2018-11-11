var express = require('express');
var router = express.Router();
const ItemController = require('../controllers/itemController.js')
const Auth = require('../middlewares/auth')
const images = require('../helper/images')

router.get('/', ItemController.show);
router.post('/', Auth.isLogin, Auth.isAdmin, ItemController.create);
router.delete('/:id', Auth.isLogin, Auth.isAdmin, ItemController.delete);
router.put('/:id', Auth.isLogin, Auth.isAdmin, ItemController.update)
router.post('/upload', Auth.isLogin, Auth.isAdmin,
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    res.status(200).json({
      message: 'Item image is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })

module.exports = router;
