const  express = require('express')
const router = express.Router()
const { findAll, insert, update, remove, findBy, gSignin, signIn, signUp, getUserData } = require('../controllers/user')
const {isLogin} = require('../middleware/isLogin')

router.get('/', findAll)
router.post('/', insert)
router.put('/:id', update)
router.delete('/:id', remove)
router.get('/:id', findBy)
router.post('/gsignin', gSignin)
router.post('/signIn', signIn)
router.post('/signUp', signUp)
router.put('/email/:email', getUserData)

module.exports = router