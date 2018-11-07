var express = require('express');
var router = express.Router();
var Items = require('../controllers/items.js')

router.post('/create', Items.createItem)
router.get('/', Items.getItems)

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;