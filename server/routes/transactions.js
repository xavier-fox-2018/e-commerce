var express = require('express');
var router = express.Router();
const {isLogin, isAdmin, inStock} = require('../middleware/auth')
const {add, showAll, showMyTrx, show, find, itemReport} = require('../controllers/transactions')

router.post('/', isLogin, inStock, add)
router.get('/:start/:end', isLogin, isAdmin, showAll)
router.get('/', isLogin, showMyTrx)
router.get('/:id', isLogin, isAdmin, show)
router.get('/detail/:id', isLogin, find)
router.get('/itemreport/:y/:m', isLogin, isAdmin, itemReport)



module.exports = router;
