var express = require('express');
var router = express.Router();
var Topup = require('../controllers/topups.js');
var Middleware = require('../middlewares/index.js');
var multer = require('multer');
const images = require('../helpers/images');

router.post('/', Middleware.isLogin, images.multer.single('validation'), images.sendUploadToGCS, Topup.createTopup);
router.get('/', Middleware.isLogin, Topup.getTopup)

//untuk admin
router.get('/verify/:id', Middleware.isLogin, Middleware.isAdmin, Topup.verifyTopup)
router.get('/all', Middleware.isLogin, Middleware.isAdmin, Topup.getAll)
module.exports = router;