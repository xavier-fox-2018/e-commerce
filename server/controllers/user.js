const User = require('../models/user')
const isEmailExists = require('../helpers/isEmailExists')
const crypto = require('crypto')

class UserController {
  static getUser (req, res) {
    User.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }

  static register (req, res) {
    const buf = crypto.randomBytes(256)
    const hash = crypto.createHmac('sha256', buf)
                       .update(req.body.password)
                       .digest('hex')
    let user = new User({
      name: req.body.name,
      password: hash,
      salt: buf,
      email: req.body.email
    })

    isEmailExists(user.email)
      .then(() => {
        user.save()
        .then(() => {
          res.status(201).json({ message: 'new user has successfully created!' })
        })
        .catch(err => {
          console.log(err)
          res.status(500).json(err)
        })
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static login (req, res) {
    User.findOne({ email: req.body.email })
      .then(data => {
        let hash = crypto.createHmac('sha256', data.salt)
                         .update(req.body.password)
                         .digest('hex')

        if (data.password == hash) {
          res.status(200).json({ message: 'login success!' })
        } else {
          res.status(400).json({ message: 'your password is wrong!' })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = UserController
