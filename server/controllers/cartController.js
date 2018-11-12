const Cart = require('../models/cart.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const mongoose = require('mongoose')
const Item = require('../models/item.js')

class CartController {
    static create(req, res) {
        Cart.create({
            cartItems: [], 
            userID: req.userID, 
            totalPrice: 0
        })
        .then( newCart => {
            res.status(200).json(newCart)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static addToCart(req, res) { 
        let itemID = mongoose.Types.ObjectId(req.body.itemID)
        Cart.findOne({userID: req.userID})
        .then( cart => {
            console.log('ini cart', cart);
            
            if (cart) { 
                let filtered = cart.cartItems.filter(function(el){
                    return el.itemID == req.body.itemID 
                })
                console.log('ini filtered', filtered);
                

                if (filtered.length == 0) { 
                    Cart.findOneAndUpdate({userID: req.userID}, 
                        { $push: 
                            { cartItems: {
                                itemID: itemID,
                                quantity: 1,
                                subTotal: req.body.itemPrice
                            }} })
                    .then(response => {
                        res.status(200).json({message: 'apa ya', response})
                    })
                    .catch(err => {
                        res.status(500).json({err})
                    })
                    
                }
                else { // klo udah ada itemID di cart -> qty + 1
                console.log('itemID nihh', mongoose.Types.ObjectId(req.body.itemID))
                
                    Item.findOne({ _id: req.body.itemID } )
                    .then( result => {
                        result.stock = result.stock - 1
                        result.save()

                        let currentItem = filtered[0].itemID;
                        console.log(currentItem, 'hehehe');
                        Cart.findOneAndUpdate({
                            userID: req.userID,
                            cartItems: { $elemMatch: { itemID: req.body.itemID } }
                            },{
                                $set: {
                                    'cartItems.$.quantity': filtered[0].quantity + 1,
                                    'cartItems.$.subTotal': filtered[0].subTotal + result.price
                                }
                            })
                        .then( response => {
                            res.status(200).json({response, currentItem})
                        })
                        .catch( err => {
                            res.status(500).json({err})
                        })
                    })
                }
            }
            else { // klo belum ada cart -> create Cart -> push newItem to cartItems
                res.status(200).json({cart, message: 'cart not yet created'})

            }
        })
        .catch( err => {
            res.status(500).json({err, msg: 'awal'})
        })
    }

    static readAll(req, res) {
        Cart.find()
        // .populate('cartItems.itemID')
        .then(allCarts => {
            res.status(200).json(allCarts)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static readCurrentCart(req, res) {
        console.log(req.userID);
        Cart.findOne({userID: req.userID})
        .populate('cartItems.itemID')
        .then( cart => {
            res.status(200).json(cart)
        })
        .catch(err => {
            res.status(500).json({err})
        })
        
    }

    static checkout(req, res) { 
        Cart.deleteOne({ userID: req.userID }) 
        .then( response => {
            Cart.create({
                cartItems: [], 
                userID: req.userID, 
                totalPrice: 0
            })
            .then( newCart => {
                res.status(200).json(newCart)
            })
            .catch(err => {
                res.status(500).json(err)
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}


module.exports = CartController
