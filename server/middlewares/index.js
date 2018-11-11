require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const isLogin = function(req, res, next){
  try {
    let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    if(decoded){
      User.findOne({email: decoded.email})
      .then(data => {
        if(data){
          req.auth_user = data
          next()
        }
      })
      .catch(error => {
        res.status(400).json({
          error_message: 'No such user'
        })
      })
      
    }
  } catch(err) {
    console.log(err)
    res.status(400).json({
      error_message: 'invalid JWT Token'
    })
  }

}

const isAdmin = function (req, res, next) {
  if(req.auth_user.role === 'admin'){
    next()
  }else{
    res.status(403).json({
      error_message: 'need admin previledges to access'
    })
  }
}




  module.exports = {isLogin, isAdmin}