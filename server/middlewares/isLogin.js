const User = require('../models/user');
const jwt = require('jsonwebtoken');

function isLogin(req, res, next) {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    User
      .findById(decoded.id)
      .then(data => {
        if (data.length > 0) {
          next()
        } else {
          res.status(500).json({
            msg : 'access unauthorized'
          })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })   
}

module.exports = isLogin;