var express = require('express');
var router = express.Router();
const Controller = require('../controllers/cart')
const User = require('../models/user')
const auth = require('../middlewares/authentication')
const groupAuth = require('../middlewares/groupAuth')
const isAdmin = require('../middlewares/isAdmin')

/* GET users listing. */
router.get('/', auth, Controller.findAll);
router.get('/:id', Controller.findById)
router.post('/', Controller.create)
router.put('/edit/:id', Controller.update)
router.put('/quantity', Controller.updateQty)
router.put('/remove', Controller.updateRemove)
router.patch('/:id', Controller.patch)
router.delete('/', auth, Controller.delete)


module.exports = router;
