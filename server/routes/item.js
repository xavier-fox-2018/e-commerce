const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item');
module.exports =router


router.get('/all', itemController.getAll)
router.delete('/deleteOne', itemController.deleteOne)
