var express = require('express');
var router = express.Router();
const {getProvince, getCity, count} = require('../controllers/shippings')

router.get('/', getProvince)
router.get('/:id', getCity)
router.post('/', count)




module.exports = router;
