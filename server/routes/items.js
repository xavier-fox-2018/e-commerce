var express = require('express');
var router = express.Router();
const ItemController = require('../controllers/itemController.js')
const Auth = require('../middlewares/auth')

router.get('/', ItemController.show);
router.post('/', Auth.isAdmin, ItemController.create);
router.delete('/:id', Auth.isAdmin, ItemController.delete);
router.put('/:id', Auth.isAdmin, ItemController.update)

module.exports = router;
