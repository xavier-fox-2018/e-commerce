const router = require('express').Router(),
      { showAllUser, update, getUserData} = require('../controllers/user'),
      { authenticate, authorize} = require('../middlewares/auth')

router
    .get('/', authenticate, authorize, showAllUser)
    .put('/', authenticate, authorize, update)
    .get('/data', authenticate, authorize, getUserData)

module.exports = router