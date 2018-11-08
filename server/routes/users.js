var express = require('express');
var router = express.Router();
const Controller = require('../controllers/userController')

const multer = require('multer')
var storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ '.jpg')
  }
})

var upload = multer({ storage: storage })

// global
router.get('/get-all-items', Controller.getAllItems)

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', Controller.signUp)
router.post('/login', Controller.login)

//for admin
router.post('/add-item', upload.single('img'), Controller.addItem)
router.post('/add-category', Controller.addCategory)
router.get('/get-category', Controller.getCategory)

module.exports = router;
