const bcrypt = require('bcryptjs')
const bcryptPassword = require('../helper/bcryptPass')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("534193051040-q1tah2abccu2dtq50nop9oq58pp5t5ih.apps.googleusercontent.com");
const User = require('../models/user')
const multer = require('multer')


const gSignin = function (req,res) {
    let token = req.body.gToken
    let clientId = process.env.GCLIENT_ID
    client.verifyIdToken({
        idToken : token,
        audience: clientId
    }, function(err, response) {
        if(!err){
            let emailUser = response.payload.email
            User.findOne({
                email: emailUser
            },function(error,response) {
                if (response) {
                    const token = jwt.sign(response.email, process.env.JWT_SECRET)
                    console.log('ini response id', response._id);
                    res.status(200).json({
                        id: response._id,
                        email: response.email,
                        role: response.role,
                        token: token
                    })
                }
                else {
                    User.create({
                        email: emailUser,
                    }, function(error, response) {
                        if (response) {
                            const token = jwt.sign({emailUser}, process.env.JWT_SECRET)
                            res.status(201).json({
                                email: emailUser,
                                role: response.role,
                                token: token
                            })
                        }
                        else{
                            res.status(400).json({
                                message: `ini error create gsignin`
                            })
                        }
                    })
                }
            })
        }
    })
}


module.exports = {
    insert: (req,res) => {
        const newUser = new User ({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
        bcryptPassword(newUser)
        newUser.save()
        .then((user) => {
            res.status(200).json({
                user: user,
                message: `User has been created`
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `User creation failed`
            })
        })
    },
    findAll: (req,res) => {
        User.find({})
        .then((user) => {
            res.status(200).json({
                user,
                message: `user has been found`
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `user can't be found`
            })
        })
    },
    findBy: (req,res) => {
        User.findById(req.params.id)
        .then((user) => {
            res.status(200).json({
                user: user,
                message: `a User has found `
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `User can't be found`
            })
        })
    },
    update: (req,res) => {
        User.updateOne(
            { _id: req.params.id},
            { 
                email: req.body.email,
                password: req.body.password,
                carts: req.body.carts,
                transactions: req.body.transactions
            },   
        )
        .then((user) => {
            User.findOne({ _id: req.params.id})
            .then((result) => {
                res.status(200).json({
                    result,
                    message: `User detail has been updated`
                })
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `failed updating User detail`
            })
        })
    },
    remove: (req,res) => {
        User.findOne({ _id: req.params.id})
        .then((user) => {
            User.deleteOne({_id: req.params.id})
            .then((result) => {
                res.status(200).json({
                    user,
                    message: `User detail has been deleted`
                })
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `User failed to delete`
            })
        })
    },
    signIn: (req,res) => {
        User.findOne({
            email: req.body.email
        })
        .then((user) => {
            // console.log('ini user _id', user._id);
            // console.log(user);
            if (bcrypt.compareSync(req.body.password, user.password) === true ) {
                const token = jwt.sign({user}, process.env.JWT_TOKEN)
                res.status(201).json({
                    email: user.email,
                    carts: user.carts,
                    role: user.role.toLowerCase(),
                    transactions: user.transactions,
                    token: token
                })
            }
            else {
                let err = {
                    message: 'Username or password wrong'
                }
                res.status(400).json(err)
            }
        })
        .catch((err)=> {
            // console.log(err)
            res.status(400).json({
                message: err.message
            })
        })
    },
    gSignin,
    signUp: function (req,res) {
        let dataUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
        console.log('in data user',dataUser);
        bcryptPassword(dataUser)
        dataUser.save()
          .then((user) => {
              console.log('ini user', user);
            const token = jwt.sign({user}, process.env.JWT_TOKEN)
            res.status(200).json({
                email: user.email,
                role: user.role.toLowerCase(),
                token,
                message : 'signup success'
            })
          })
          .catch((err) => {
            res.status(500).json({
              message : 'signup failed'
            })
          });
    },

    updateUser: (req,res) => {
        User.findOne({
            email: req.body.email
        })
        .then((user) => {
            
            if (bcrypt.compareSync(req.body.password, user.password) === true ) {
                const token = jwt.sign({user}, process.env.JWT_TOKEN)
                res.status(201).json({
                    email: user.email,
                    token: token
                })
            }
            else {
                let err = {
                    message: 'Username or password wrong'
                }
                res.status(400).json(err)
            }
        })
        .catch((err)=> {
            // console.log(err)
            res.status(400).json({
                message: err.message
            })
        })
    },

    aboutClick: function() {

    },

    getUserData: function(req,res) {
        console.log('dapet email dari client', req.headers);
        console.log('ini headers carts', req.headers.carts);
        User.updateOne({email: req.params.email},
        {
            carts: req.headers.carts
        })
        .then((user) => {
            // user.carts = req.headers.carts
            console.log('ini user', user);
            res.status(200).json({
                user
            })
        })
        .catch((err) => {
            res.status(400).json({
                err,
                message: `you can't access the carts data`
            })
        })
    },

    updateCart: function(req,res) {
        console.log('masuk update cart');
    }
}