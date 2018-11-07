const User = require('../models/user')
const jwt = require('jsonwebtoken')

function isLogin (req,res,next) {
  let token = req.headers.token
  if (token) {
      jwt.verify(token, process.env.DATA_ACCESS, function (err, decoded) {
        if (!err) {
          User.findOne({ username : decoded.username })
          .then(function (user) {
            if(user){
              req.userId = decoded.userId
              req.accessMarket = user.marketAvailable
              next()
            } else {
              res.status(500).json({
                message : `access denied`
              })
            }
          })
        } else {
          res.status(500).json({
              message : `access denied`
          })
        }
      })
  } else {
      res.status(500).json({
          message : `access denied`
      })
  }
}

module.exports = isLogin