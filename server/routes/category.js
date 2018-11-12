const router = require('express').Router(),
      CategoryCont = require('../controllers/category')


router
    .post('/', CategoryCont.create)

module.exports = router