const router = require('express').Router(),
      {register, login} = require('../controllers/login')

router
    .post('/register', register)
    .post('/login', login)

module.exports = router