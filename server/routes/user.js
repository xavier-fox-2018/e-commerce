const router = require('express').Router(),
      { showAllUser, update} = require('../controllers/user'),
      { authenticate, authorize} = require('../middlewares/auth')

router
    .get('/', authenticate, authorize, showAllUser)
    .put('/', authenticate, authorize, update)

module.exports = router