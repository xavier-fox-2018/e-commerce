var express = require('express');
var router = express.Router();
const Controller = require('../controllers/userController')
const middleware = require('../middlewares/index')

const multer = require('multer')
var storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

var upload = multer({ storage: storage })

// global
router.post('/get-all-items', middleware.cehckAdmin, Controller.getAllItems)
router.post('/search-items', Controller.searchItems)

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// for users
router.post('/signup', Controller.signUp)
router.post('/login', Controller.login)
router.post('/login-google', Controller.loginGoogle)

//for admin
router.post('/add-item', upload.single('img'), Controller.addItem)
router.post('/add-category', Controller.addCategory)
router.get('/get-category', Controller.getCategory)
router.put('/edit-item', upload.single('img'), Controller.editItem)
router.delete('/delete-item', Controller.deleteItem)

module.exports = router;
