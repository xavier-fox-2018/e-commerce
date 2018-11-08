const Cart = require('../models/cart.js')

class CartController {
    static create(req, res) {
        Cart.create({
            cartItems: [], 
            user: req.body.user, 
            totalPrice: 0
        })
        .then( newCart => {
            res.status(200).json(newCart)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static read(req, res) {
        Cart.find()
        .then(allCarts => {
            res.status(200).json(allCarts)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static update(req, res) { 
        Cart.updateOne({ _id: req.params.cartID},
        {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            imageUrl: req.body.imageUrl
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static delete(req, res) {
        Cart.deleteOne({ _id: req.params.cartID })
        .then( response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}


module.exports = CartController
