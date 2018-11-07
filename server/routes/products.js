var express = require('express');
var router = express.Router();
const Controller = require('../controllers/product')
const User = require('../models/user')
const auth = require('../middlewares/authentication')
const groupAuth = require('../middlewares/groupAuth')
const isAdmin = require('../middlewares/isAdmin')

/* GET users listing. */
router.get('/', Controller.findAll);
router.get('/:id', auth, Controller.findById)
router.post('/', isAdmin, Controller.create)
router.put('/:id', isAdmin, Controller.update)
router.put('/add-to-cart/:id', auth, Controller.updateQuantity)
router.patch('/:id', isAdmin, Controller.patch)
router.delete('/:id', isAdmin, Controller.delete)
// router.get('/group/:groupId', auth, groupAuth, Controller.findByGroup)
// router.get('/getMap/:address', Controller.getMap)


module.exports = router;
