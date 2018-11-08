const User = require('../models/User')
const isEmail = require('../helpers/isEmail')
const jwt = require('../helpers/jwtHelper')
const bcrypt = require('bcryptjs')

class UserController {
    static register(req,res){
        // console.log(isEmail(req.body.email) && req.body.password.length > 8)
        if(isEmail(req.body.email) && req.body.password.length > 8){
            User.create({
                name: req.body.name,
                email: req.body.email,
                password : req.body.password
            })
                .then(user=>{
                    res.status(200).json({
                        user: user,
                        message: "User is succesfully registered"
                    })
                })
                .catch(err=>{
                    res.status(500).json({
                        err: err.message
                    })
                })
        } else {
            if(req.body.password.length < 8) {
                res.status(400).json({
                    message: "password must be at least 8 characters"
                })
            } else {
                res.status(400).json({
                    message: "Please insert a valid email"
                })
            }
        }
    }

    static login(req,res){
        User.findOne({
            email: req.body.email
        })
            .then(user=>{
                if(user){
                    if(bcrypt.compareSync(req.body.password, user.password)){
                        let data = {
                            name: user.name,
                            _id: user._id,
                            role: user.role
                        }
                        let token = jwt.encode(data)
                        res.status(200).json({
                            token: token,
                            name: user.name
                        })
                    } else {
                        res.status(400).json({
                            message: "email and password missmatch"
                        })
                    }
                } else {
                    res.status(400).json({
                       message: "Your email doesn't match our records"
                    })
                }
            })
            .catch(err=>{
                console.log(err)
                res.status(400).json({
                    error: err.message
                })
            })
    }

    static update(req,res){

    }

    static gsignin(req,res){

    }

    static show(req,res){

    }
    
    static signout(req,res){

    }
}

module.exports = UserController