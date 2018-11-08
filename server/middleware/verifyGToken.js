
const {OAuth2Client} = require('google-auth-library');
const clientId=process.env.CLIENTID;
const client = new OAuth2Client(clientId);
const userModel= require('../models/user.js');

function verifyGToken (req,res,next) {
    client.verifyIdToken({
        idToken: req.headers.token,
        audience: clientId,  
    }, (err, ticket) => {
      if(err) return res.status(500).json({msg:'invalid token'});
      const payload = ticket.getPayload();
      userModel.findOne({
        email: payload['email']
      })
      .then(user => {
        //if no user found register
        if(!user) { userModel.create({
            name: payload['given_name'] + payload['family_name'],
            email: payload['email'],
            role: 'customer',
            password: '',
            cart: []
            })
          .then(newUser => res.status(200).json(newUser))
          .catch(err => res.status(500).json(err))
        }
        else {
          res.status(200).json(user);
        }
      });
    })
  }
  module.exports=verifyGToken