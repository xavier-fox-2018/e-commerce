require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = function (req, res, next) {
  req.decoded = jwt.verify(req.headers.token, process.env.SECRET)
  User.findById(req.decoded.id)
    .then(data => {
      if (data) {
        next()
      } else {
        res.status(400).json({ message: 'Please login first!' })
      }
    })
    .catch(err => {
      res.status(400).json({ message: 'Please login first!!' })
    })
}