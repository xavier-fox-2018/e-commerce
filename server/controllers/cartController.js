const Cart = require('../models/cart.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const mongoose = require('mongoose')
const Item = require('../models/item.js')

class CartController {
    static create(req, res) {
        Cart.create({
            cartItems: [], // awalnya isi dengan object pertama ato dikosongin??
            userID: req.userID, // nnti jadi req.user karena dapet dari middleware
            totalPrice: 0
        })
        .then( newCart => {
            res.status(200).json(newCart)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static addToCart(req, res) { // dari client: itemID
        // console.log('masukk',req.body.itemID, 'user', req.userID);
        
        let itemID = mongoose.Types.ObjectId(req.body.itemID)
        // cari cart based on userID -> klo ada di push, klo ga ada create baru trs masukin ke cart
        Cart.findOne({userID: req.userID})
        .then( cart => {
            // console.log(mongoose.Types.ObjectId(req.body.itemID), 'apaa nihhhh');
            console.log('ini cart', cart);
            
            if (cart) { // klo uda ada cart -> push newItem ke cartItems
                let filtered = cart.cartItems.filter(function(el){
                    return el.itemID == req.body.itemID // string, bukan ObjectId
                })
                console.log('ini filtered', filtered);
                

                if (filtered.length == 0) { // klo blom ada itemIDnya di cart: 
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
                            // response.cartItems // sampe sinii, qty + 1, stock - 2
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

    static checkout(req, res) { // saat checkout -> akan otomatis buat cart kosong baru
        Cart.deleteOne({ userID: req.userID }) 
        .then( response => {
            // res.status(200).json(response)
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
