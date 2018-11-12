const User = require('../models/user')
const Cart = require('../models/cart')
const jwt = require('jsonwebtoken')
const {generateSalt, hashPassword, compare} = require('../helpers/helper')

class UserController {
    static register (req, res) {
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                res.status(400).json({message: 'email already used'})
            } else {
                User.create({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: req.body.password
                })
                    .then(data => {
                        Cart.create({
                            user: data._id
                        })
                        .then(cart => {
                            res.status(201).json(data)
                        })
                        .catch(err => {
                            res.status(500).json(err)
                        })

                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
            }
        })       
    }

    static login (req, res) {
        User.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    const pwd = compare(req.body.password, user.password)
                    console.log(pwd)
                    if (pwd) {
                        const data = {
                            fullName: user.fullName,
                            email: user.email
                        }
                        const token = jwt.sign(data, process.env.JWT_SECRET)

                        res.status(200).json({token: token, user: data.name})
                    } else {
                        res.status(400).json({message: 'invalid password'})
                    }
                } else {
                    res.status(400).json({message: 'no user found'})
                }
               
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}

module.exports = UserController