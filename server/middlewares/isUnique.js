const User = require('../models/user.js');

function isUnique(req, res, next) {
  User
    .find({
      email : req.body.email
    })
    .then(user => {
      if (user.length > 0) {
        res.status(400).json({
          msg : 'Email already used'
        })
      } else {
        next()
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = isUnique