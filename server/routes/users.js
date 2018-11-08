const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller')
const otorize = require('../middlewares/otorize')
const authentication = require('../middlewares/auth')

/* GET users listing. */
router.post('/gSignIn', UserController.gSignIn );
router.post('/signin', UserController.signIn );
router.post('/', UserController.create );
router.put('/:id', authentication, otorize, UserController.update );
router.get('/', authentication, otorize, UserController.findAll );
router.post('/:id', authentication, otorize, UserController.findOne );
router.delete('/:id', authentication, otorize, UserController.delete );

module.exports = router;
