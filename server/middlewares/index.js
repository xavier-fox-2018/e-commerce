const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
require('dotenv').config()

class Middleware {
    static cehckAdmin (req,res,next){
       let user= jwt.verify(req.body.token, process.env.JWT_SECRET)
       if (user.role !== 'Admin'){
           res.send('error')
       } else {
           next()
       }
    }
}

module.exports = Middleware