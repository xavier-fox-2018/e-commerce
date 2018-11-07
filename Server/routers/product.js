const  express = require('express')
const router = express.Router()
const { findAll, insert, update, remove, findBy_id, gSignin, findBy_category, findBy_name, isLogin } = require('../controllers/product')


router.get('/', findAll)
router.post('/', insert)
router.put('/:id', update)
router.delete('/:id', remove)
router.get('/:id', findBy_id)
router.get('/name/:name', findBy_name)
router.get('/category/:category', findBy_category)
router.post('/gsignin', gSignin)

module.exports = router