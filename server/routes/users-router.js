const express = require('express');
const router = express.Router();
const {signup, signin, findAll} = require('../controllers/user-controllers')

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/', findAll)

module.exports = router;
