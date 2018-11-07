var express = require('express');
var router = express.Router();
const Controller = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', Controller.signUp)

//for admin
router.post('/add-item', Controller.addItem)

module.exports = router;
