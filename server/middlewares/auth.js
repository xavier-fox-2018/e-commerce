const User = require('../models/user');
const jwt = require('jsonwebtoken');

class Auth {

  static isAdmin(req, res, next) {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    User
      .findById(decoded.id)
      .then(data => {
        if(data.isAdmin) {
          next()
        } else {
          res.status(400).json({
            msg : 'Unauthorized Access'
          })
        }
      })
      .catch(err => {
        json.status(500).json(err)
      }) 
  }

  static isUnique(req, res, next) {
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

  static isLogin(req, res, next) {
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

  static isOwner(req, res, next) {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);

    User
      .findById(decoded.id)
      .then(data => {
        if(decoded.id == req.params.id) {
          next()
        } else {
          res.status(400).json({
            msg : 'Unauthorized Access'
          })
        }
      })
      .catch(err => {
        json.status(500).json(err)
      })   
  }
}

module.exports = Auth;