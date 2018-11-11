var express = require('express');
var router = express.Router();
const Controller = require('../controllers/indexController')

/* GET home page. */
router.get('/',Controller.getAllData);
router.post('/item-by-category', Controller.getItemCategory)

module.exports = router;
