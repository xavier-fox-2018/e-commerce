const  express = require('express')
const router = express.Router()
const { findAll, create, update } = require('../controllers/cart')


router.get('/', findAll)
router.post('/', create)
router.put('/', update)

module.exports = router