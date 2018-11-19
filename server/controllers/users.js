require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.ID_GOOGLE);
const axios = require('axios')
const User = require('../models/users')
const Item = require('../models/items')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

module.exports = {
    glogin: function(req, res){
        User.findOne({
            email: req.decoded.email,
            isGoogle: true
        })
        .then((data) => {                                                
            if(!data){
                res.status(400).json({ msg: "user not found" })
            } else {      
                let isPass = bcrypt.compareSync(process.env.PASS, data.password)   
                if(isPass){             
                    let user = jwt.sign({
                        id: data._id,
                        email: data.email,
                        name: data.name,
                        picture: data.picture},
                        process.env.JWT_KEY );                              
                    res.status(200).json({ token: user })
                } else {                    
                    res.status(401).json({ msg: "Wrong Password" })
                }
            }
        })
        .catch((err) => {
            res.status(500).json({ msg: err })
        })
    },
    register: function(req, res){
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then((result) => {
            res.status(201).json({message: "Register Success :)", data: result})
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    edit: function(req, res){
        User.update({
            _id: req.body.id
        }, {
            password: req.body.password,
            picture: req.body.picture
        })
        .then((result) => {
            res.status(201).json({message: "User Edited"})
        }).catch((err) => {
            res.status(500).json({message: err.message})
        });
    },
    login: function(req, res){
        User.findOne({
            email: req.body.email
        })
        .then((result) => {    
            if (!result){
                res.status(400).json({status:false, message: "user not found!"})
            } else {
                let password = bcrypt.compareSync(req.body.password, result.password)                
                if(password){
                    let token = jwt.sign({
                        id: result._id,
                        email: result.email,
                        isAdmin: result.isAdmin
                    }, process.env.JWT_KEY)
                    res.status(200).json({token: token, message: 'Login sukses'})
                } else {
                    res.status(400).json({message: "Wrong Password"})
                }
            }
        })
        .catch(err => {
            res.status(500).json(err)
        });
    },
    getUser: function(req, res){        
        User.findOne({
            _id: req.decoded.id
        })
        .populate('cart.item')
        .populate('transaction')
        .select('_id name email picture isAdmin cart transaction')
        .exec()
        .then((result) => {            
            res.status(200).json({data: result})
        })
        .catch((err) => {
            res.status(500).json(err)
        });
    },
    addToCart: function(req, res){
        let itemId = mongoose.Types.ObjectId(req.body.item)
        let result = req.decoded.cart.filter(function(data){  // cari udh ada apa blm itemnya, result nya array
            return itemId.equals(data.item)
        })
        if(result.length === 0){
            User.updateOne({
                _id: req.decoded.id
            }, {$push: {
                cart: {
                    item: req.body.item,
                    qty: 1
                }
            }})
            .then((result1) => {
                // console.log(result1);
                res.status(200).json({message: 'add to Cart success'})
            }).catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
        } else {            
            User.updateOne({
                _id: req.decoded.id,
                'cart.item': req.body.item
            },{ $set: {
                'cart.$.qty' : result[0].qty + 1
            }})
            .then((result2) => {
                // console.log(result2);
                res.status(200).json({message: 'add to Cart success'})
            }).catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
        }
    },
    removeFromCart: function(req, res){
        let itemId = mongoose.Types.ObjectId(req.body.item)
        // console.log(req.decoded.cart);
        let result = req.decoded.cart.filter(function(data){  // cari udh ada apa blm itemnya, result nya array
            return itemId.equals(data.item)
        })
        if(result[0].qty > 1){
            User.updateOne({
                _id: req.decoded.id,
                'cart.item': req.body.item
            }, { $set: {
                'cart.$.qty' : result[0].qty - 1
            }})
            .then((result1) => {
                // console.log(result1);
                res.status(200).json({message: 'remove from Cart success'})
            }).catch((err) => {
                res.status(500).json(err)
            });
        } else if(result[0].qty === 1){
            User.updateOne({
                _id: req.decoded.id
            }, { $pull : {
                cart: {
                    item: req.body.item
                }
            }})
            .then((result) => {
                // console.log(result);
                res.status(200).json({message: 'remove from Cart success'})
            }).catch((err) => {
                res.status(500).json(err)
            });
        }

    }
}