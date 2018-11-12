const mongoose = require('mongoose')
const Cart = require('../models/cart')
const Product = require('../models/product')

class CartController {

    static create(req, res) {
        // let tempCart = null
        Cart.findOne({
            user: req.user._id
        })
        .then(cart => {         
            const productId = mongoose.Types.ObjectId(req.body.product.productId)
            const cartLength = cart.products.find(function(data) {
                return productId.equals(data.productId);
            })

            if (cartLength) {
                const index = cart.products.findIndex(function(data) {
                    return productId.equals(data.productId);
                })
                cart.products[index].qty += 1
                cart.save()
                    .then(cart => {
                        Product.findById(req.body.product.productId)
                            .then(product => {
                                product.stock -= 1
                                product.price = req.body.product.price
                                product.save()
                                    .then(product => {
                                        res.status(201).json({message:'success added to cart', cart})
                                    })
                            })
                    })                
                 
            } else {
               cart.products.push(req.body.product)
               cart.save()
                   .then(_ => {
                       Product.findById(req.body.product.productId)
                        .then(product => {
                            product.stock -= 1
                            product.price = req.body.product.price
                            product.save()
                                .then(_ => {
                                    res.status(201).json({message: 'success added to cart', cart})
                                })
                                .catch(err => {
                                    res.status(500).json(err)
                                })
                        })
                   })
                   .catch(err => {
                       res.status(500).json(err)
                   })
            }
            
        })       
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getAll(req, res) {
        Cart.findOne({
            user: req.user._id
        })
        .then(cart => {
            res.status(200).json(cart)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
       
}

module.exports = CartController