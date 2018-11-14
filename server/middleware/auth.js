require('dotenv').config()
const User = require('../models/users')
const Item = require('../models/items')
const jwt = require('jsonwebtoken')
const {emptyCart} = require('../helpers/users')

module.exports = {
    isLogin: function(req, res, next){
        let user = jwt.verify(req.headers.token, process.env.JWT_KEY)
        if(user){
            User.findOne({
                email: user.email
            })
            .then((result) => {
                if(result){                    
                    req.decoded = result                                                
                    next()
                } else {
                    res.status(400).json({message: 'Access Forbiden, please login first!'})
                }
            }).catch((err) => {
                res.status(400).json({err: err})
            });
        } else {
            res.status(400).json({message: 'Access Forbiden, please login first!'})   
        }
    },
    isAdmin: function(req, res, next){                
        if(req.decoded.isAdmin === true){            
            next()
        } else {            
            res.status(400).json({message: 'Access Forbiden, please login as Admin!'})   
        }
    },
    inStock: function(req, res, next){
        User.findOne({
            _id: req.decoded._id
        })
        .populate('cart.item').exec()
        .then((result) => {
            let cek = true
            result.cart.forEach(item => {
                if(item.item.stock < item.qty){
                    cek = false
                }
            });
            if(cek){
                next()
            } else {
                emptyCart()
                next('stock lower than quantity!')
                // res.status(400).json({message: 'stock lower than quantity!'})
            }
        }).catch((err) => {
            res.status(400).json({message: 'stock lower than quantity!', err: err})   
        });
    }

}