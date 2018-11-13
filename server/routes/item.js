const router = require('express').Router()
const itemController = require('../controllers/itemController.js')
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const isAdmin = require('../middlewares/isAdmin.js')
const images = require('../helpers/images')
const Item = require('../models/item.js')
 

router.get('/', itemController.read) 
router.post('/', itemController.create)
router.put('/:itemID', itemController.update)
router.delete('/:itemID', isAdmin, itemController.delete)
router.get('/:itemName', itemController.findItem)
 

router.put('/upload/:itemID',
  images.multer.single('image'),  
  images.sendUploadToGCS,
  (req, res) => {
    console.log(req.params.itemID, 'ini itemID');
    Item.updateOne({ _id: req.params.itemID},
        {
            imageUrl: req.file.cloudStoragePublicUrl
        })
        .then(response => {
            res.status(200).json({response, message: 'Your file is successfully uploaded', link: req.file.cloudStoragePublicUrl})
        })
        .catch(err => {
            res.status(500).json({err})
        })
  })


module.exports = router