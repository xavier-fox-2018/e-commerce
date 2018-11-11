const router = require('express').Router()
const controller = require('../controllers/itemController')
const images = require('../helpers/images')

router.get('/',controller.read)
router.get('/category/:id',controller.readByCategory)
router.get('/:id',controller.readOne)
router.post('/',controller.create)
router.put('/:id',controller.update)
router.put('/delete/:id',controller.changeToDeleted)
router.delete('/:id',controller.delete)

router.post('/upload',
    images.multer.single('image'), 
    images.sendUploadToGCS,
    (req, res) => {
        res.send({
        status: 200,
        message: 'Your file is successfully uploaded',
        link: req.file.cloudStoragePublicUrl
    })
})

module.exports = router