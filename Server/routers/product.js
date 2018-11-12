const  express = require('express')
const router = express.Router()
const { findAll, insert, update, remove, findBy_id, findBy_category, findBy_name } = require('../controllers/product')
const isLogin = require('../middleware/isLogin')

router.get('/', findAll)
router.post('/', insert)
router.put('/:id', update)
router.delete('/:id', remove)
router.get('/:id', findBy_id)
router.get('/name/:name', findBy_name)
router.get('/category/:category', findBy_category)


module.exports = router