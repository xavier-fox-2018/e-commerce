const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController.js');
const isAdmin = require('../middlewares/auth.js').isAdmin
const isOwnerOfId = require('../middlewares/auth.js').isOwnerOfId

router.get('/',isAdmin, UserController.list)
router.get('/:id', isOwnerOfId, UserController.findOneById)
router.put('/:id', UserController.update);
router.delete('/:id', isOwnerOfId, UserController.remove);

module.exports = router;
