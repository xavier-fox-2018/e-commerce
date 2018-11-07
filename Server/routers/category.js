const  express = require('express')
const router = express.Router()
const { findAll, create, } = require('../controllers/category')


router.get('/', findAll)
router.post('/', create)

module.exports = router