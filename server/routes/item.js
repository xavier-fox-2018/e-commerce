const express = require('express');
const router = express.Router();
const controller = require('../controllers/item');
module.exports =router


router.get('/all', controller.getAll)