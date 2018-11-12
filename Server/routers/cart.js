const  express = require('express')
const router = express.Router()
const { findAll, create } = require('../controllers/cart')


router.get('/', findAll)
router.post('/', create)

module.exports = router