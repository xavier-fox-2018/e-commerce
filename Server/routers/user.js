const  express = require('express')
const router = express.Router()
const { findAll, insert, update, remove, findBy, gSignin, isLogin, signIn, signup } = require('../controllers/user')


router.get('/', findAll)
router.post('/', insert)
router.put('/:id', update)
router.delete('/:id', remove)
router.get('/:id', findBy)
router.post('/gsignin', gSignin)
router.post('/signIn', signIn)
router.post('/signUp', signup)
// router.post('/gsignin', (req,res) => {
//     console.log('masukk');
// })

module.exports = router