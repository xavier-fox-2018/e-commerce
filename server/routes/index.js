const router = require("express").Router()
const UserController = require('../controllers/UserController.js')
const { googleAuth, isLogin } = require('../middlewares/auth')
const { googleSignUp } = require('../controllers/UserController.js')
const media = require('../helpers/media')

router.get('/',(req,res)=>{res.status(200).send('Connected - Express App')})

router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.post('/gsignin',googleAuth, googleSignUp)

router.get('/verify', UserController.verify)
router.use('/users',isLogin, require('./UserRoutes.js'))
router.use('/items', require('./ItemRoutes.js'))
router.use('/carts',isLogin, require('./CartRoutes.js'))
router.use('/transactions',isLogin, require('./TransactionRoutes.js'))

router.post('/uploads/picture', isLogin, media.multer.single('picturefile'), media.sendUploadToGCS, (req, res) => {
    if (!req.file) {
        return res.status(200).json({
            link: 'https://storage.googleapis.com/h8ikestore.adishare.online/bikePlaceholder.png'
        })
    }
    res.status(201).json({
        link: req.file.cloudStoragePublicUrl
    })
})

module.exports = router;
