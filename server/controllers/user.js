const Model = require('../models/user');
const bcrypt = require('bcrypt');
// console.log(Model)
class User {
  static signIn (req,res, next) {
    if(req.headers.token) next()

    Model.findById(req.headers.id)
    //define mongoose populate  in model 
    .then( user => {
      //if no user found send error message
      if(!user) throw 'username not found. Please register.'
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
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      Model.create({
        name: req.body.name,
        username: req.body.username,
        role : 'customer',
        password: hash,
        items: []
      })
      .then( payload => {
        res.locals.payload=payload
        next()
      })
    })
    //create new user in DB
    .catch( err => res.status(500).json(err))
  }

  static delete (req,res) {
    Model.findOneByIdAndRemove(req.body.id)
    .then(user => {
      if(!user) throw 'user does not exist'
      else res.status(200).json({msg: 'successfully deleted admin'})
    })
    .catch(err => res.status(500).err(err))
  }
}

module.exports = User;