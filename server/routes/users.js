var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController.js')

/* GET users listing. */
router.post('/', UserController.create);
router.post('/login', UserController.login)

router.post('/coba', (req, res) => {
  res.status(200).json(req.body)
  
  
})

module.exports = router;
