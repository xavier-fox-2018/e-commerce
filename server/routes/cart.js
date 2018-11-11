const express = require('express');
const router = express.Router()
const Controller = require('../controllers/cartController')

router.post('/add', Controller.addCart)
router.delete('/delete', Controller.deleteCart)
router.post('/unpaid', Controller.getUnpaidItem)
router.post('/paid', Controller.getAllPaidItem)
router.post('/checkout', Controller.checkOut)
router.post('/submit-checkout', Controller.submitCheckOut)

module.exports=router