const Model = require('../models/user');
const bcrypt = require('bcrypt');
const helperCreateToken = require('../helpers/createToken');
const jwt = require('jsonwebtoken');

class User {
  static signIn (req,res, next) {
    if(req.headers.token){
      console.log('user has token')
      jwt.verify(req.headers.token, process.env.SECRET, function(err, decoded) {
        if (err) {
          
        }
        else res.send(200).json('user has signed in with jwt token'); 
      })
    }
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
          if(data==false) res.status(500).json('wrong password');
          else {
            const token = jwt.sign(
              user.toObject(), 
              process.env.SECRET
              );
            res.status(200).json({token:token});
          }
        })
      }
    })
    .catch( err => res.status(500).json(err))
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
      .then(payload => {
        const token = jwt.sign(
          payload.toObject(), 
          process.env.SECRET
          );
        res.status(200).json({
          token:token
        })
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