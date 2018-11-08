var express = require('express');
var router = express.Router();
const {isLogin} = require('../middleware/auth')
const {add, show, find} = require('../controllers/transactions')

router.post('/', isLogin, add)
router.get('/:id', isLogin, show)
router.get('/detail/:id', isLogin, find)




module.exports = router;
