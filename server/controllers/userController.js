const User = require('../models/user.js')
const helper = require('../helper/helper.js')
const bcryptjs = require('bcryptjs');

class UserController {

  static create (req, res) {
    const hash = helper.hashPassword(req.body.password);
    User
      .create({
        name : req.body.name,
        address : req.body.address,
        email : req.body.email,
        password : hash,
        isAdmin : true
      })
      .then((response) => {
        res.status(201).json({
          msg : 'user created successfully'
        })
      })
      .catch(err => {
        res.status(500).json({
          msg : 'fail create'
        })
      })
  }

  static delete (req, res) {
    User
      .deleteOne({
        _id : req.params.id
      })
      .then(response => {
        res.status(200).json({
          msg : 'user successfully deleted'
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  
  static login (req, res) {
    User.findOne({
      email : req.body.email
    })
      .then((user) => {
        const result = bcryptjs.compareSync(req.body.password, user.password);
        if (result) {
          helper.generateToken(user.email, user._id, user.isAdmin)
            .then((token) => {
              res.status(200).json({
                msg : 'login success',
                token : token,
                admin : user.isAdmin
              })
            })
            .catch((err) => {
              res.status(500).json(err)
          })
        } else {
          res.status(400).json({
            msg : 'invalid email / password'
          })
        }
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({
          msg : 'Invalid email / password'
        })
      })
  }
  
  static getRole (req, res) {
    res.status(200).json(req.user.isAdmin)
  }
}

module.exports = UserController;