var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController.js')
const auth = require('../middlewares/auth')

/* GET users listing. */
router.post('/', UserController.create)
router.post('/login', UserController.login)
router.get('/role', auth.isLogin, UserController.getRole)

router.post('/coba', (req, res) => {
  res.status(200).json(req.body)
  
  
})

module.exports = router;
