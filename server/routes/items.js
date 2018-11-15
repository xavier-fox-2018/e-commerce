const express = require('express');
const router = express.Router()
const Controller =require('../controllers/itemsController')

router.get('/all-items', Controller.getAllItems)
router.post('/category', Controller.getItemsByCategory)
router.post('/search', Controller.searchItems)



module.exports = router