const Mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

class Middleware {
    static authenticate(req,res,next){
        let token = req.headers.token

        if(token){
            const decoded = jwt.verify(token, process.env.secret_key);

            // console.log('decoded in middleware',decoded)
            req.userId = decoded.id
            next()

        }else{
            res.status(401).json({
                message : 'token not found'
            })
        }
    }

    static emailUnique(req,res,next){
        User.findOne({
            email : req.body.email
        })
        .then((result)=>{
            if(result){
                res.status(500).json({
                    message : 'Email Address Already in Use'
                })
            }else{
                next()
            }
        })
        .catch((err)=>{
            res.status(500).json({
                error : err,
                message : 'Internal Server Error'
            })
        })
    }
}

module.exports = Middleware