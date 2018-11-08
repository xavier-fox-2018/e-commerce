const Model = require('../models/user');
const bcrypt = require('bcrypt');
class User {
  static signIn (req,res, next) {
    Model.findOne({
      email:req.body.email
    })
    .then( user => {
      //if no user found send error message
      if(!user) throw 'email not found. Please register.'
      else {
      //check password with bcrypt
        bcrypt.compare(req.body.password, user.password)
        .then( data => {
          if(!data) throw 'wrong password. Try again.' ;
          else res.status(200).json(data.items);
        })
      }
    })
    .catch( err => res.status(500).err(err))
  }

  static register(req,res, next) {
    //create new user in DB
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      Model.create({
        name: req.body.name,
        email: req.body.email,
        role : 'customer',
        password: hash,
      })
      .then( payload => {
        res.locals.payload=payload;
        next()
      })
    })
    .catch( err => res.status(500).json(err))
  }

  static delete (req,res) {
    Model.findByIdAndRemove(req.body.id)
    .then(user => {
      res.status(200).json({msg: 'successfully deleted user'})
    })
    .catch(err => res.status(500).json('user does not exist'))
  }
}

module.exports = User;