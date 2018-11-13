const User = require('../models/user.js')
const Cart = require('../models/cart.js')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserController {
    static register(req, res) {
        const hash = crypto.createHmac('sha256', process.env.HASH_SECRET) // kayaknya ada yang kurang, soalnya smua hashing password jd sama
        .update(req.body.password)
        .digest('hex')

        console.log(hash);
        
        User.create({
            email: req.body.email,
            password: hash
        })
        .then(data => {
            console.log(data);
            
            Cart.create({
                cartItems: [], 
                userID: data._id, 
                totalPrice: 0
            })
            .then( newCart => {
                res.status(200).json({data, newCart})
            })
            .catch(err => {
                res.status(500).json(err)
            })
        })
        .catch(err => {
            res.status(500).json(err) 
        })
    }

    static login(req, res) {
        let accesstoken = req.headers.accesstoken
        console.log('accesstoken', accesstoken);
        const hash = crypto.createHmac('sha256', process.env.HASH_SECRET) // kayaknya ada yang kurang, soalnya smua hashing password jd sama
        .update(req.body.password)
        .digest('hex')

        User.findOne({email: req.body.email, password: hash}) // langsung ngecek si email & hashed password
        .then(user => {
            if (!user) {
                res.status(400).json({ message: 'wrong username or password'}) // klo ga ada user -> message aja, tp nnti res.status nya 400. tp kan 
            }
            else { 
                const accesstoken = jwt.sign({ // tanpa password yaa, detail yg lain bisa di reference nnti
                    id: user._id,
                    name: user.name, 
                    email: user.email,
                    role: user.role
                }, process.env.JWT_SECRET)
                res.status(200).json({ message: 'user exist', accesstoken, userID: user._id, role: user.role }) // gpp ga gw lempar userID & role?
            }

        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static readAllUsers(req, res) { 
        User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    } 

    static delete(req, res) { 
        User.deleteOne(
            { _id: req.params.userID}
        )
        .then( data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static update(req, res) { 
        const hash = crypto.createHmac('sha256', process.env.HASH_SECRET) 
        .update(req.body.password) // ini update gmn? baca lagi!
        .digest('hex')

        User.updateOne({ _id: req.params.userID }, { 
            name: req.body.name,
            email: req.body.email,
            password: hash, 
            address: req.body.address,
            phoneNumber: req.body.phoneNumber
        })
        .then( data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static updateRole(req, res) { 
        User.updateOne({ _id: req.params.userID }, { 
            role: req.body.role
        })
        .then( data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }


}

module.exports = UserController

                