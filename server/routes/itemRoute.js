const router = require('express').Router()
const controller = require('../controllers/itemController')
const images = require('../helpers/images')
const middleware = require('../middlewares/index')

router.get('/',controller.read)
router.get('/category/:id',controller.readByCategory)
router.get('/:id',controller.readOne)
router.post('/',middleware.authenticate,middleware.isAdmin,controller.create)
router.put('/:id',middleware.authenticate,middleware.isAdmin,controller.update)
router.put('/delete/:id',middleware.authenticate,middleware.isAdmin,controller.changeToDeleted)
router.delete('/:id',middleware.authenticate,middleware.isAdmin,controller.delete)

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