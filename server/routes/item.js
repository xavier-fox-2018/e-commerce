const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item');
const verifyToken = require('../middleware/verifyToken');
module.exports =router

router.use(verifyToken)
router.get('/all', itemController.getAll)
router.get('/:id', itemController.getOne)
router.post('/', itemController.create)
router.post('/update', itemController.update)
router.delete('/:id', itemController.deleteOne)
