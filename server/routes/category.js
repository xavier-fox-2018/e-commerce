var express = require('express');
var router = express.Router();
const Controller = require('../controllers/category')
const User = require('../models/user')
const auth = require('../middlewares/authentication')
const groupAuth = require('../middlewares/groupAuth')
const isAdmin = require('../middlewares/isAdmin')

/* GET users listing. */
router.get('/', Controller.findAll);
router.get('/:id', Controller.findById)
router.post('/', isAdmin, Controller.create)
router.put('/:id', isAdmin, Controller.update)
router.patch('/:id', Controller.patch)
router.delete('/:id', isAdmin, Controller.delete)


module.exports = router;
