const User = require('../models/user')
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
    const hash = crypto.createHmac('sha256', salt)
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
}

module.exports = UserController
