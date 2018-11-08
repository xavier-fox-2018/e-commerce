var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/gsignin', UserController.gsignin)
router.patch('/:id/update', UserController.update)
router.get('/:id', UserController.show)

module.exports = router;
