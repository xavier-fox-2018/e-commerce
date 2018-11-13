var Cart = require('../models/carts.js');
var jwt = require('jsonwebtoken');
require('dotenv').config();
var request = require('request');
var Helper = require('../helpers/index.js');
var Item = require('../models/items.js')
class CartsControlller {
    /** POST /carts/addToCart */
    static addToCart(req, res) {
        // res.json(req.logged_in_user)
        Item.findOne({
                _id: req.body.cart
            })
            .then((response) => {
                // res.json(response)
                let tmp = Number(response.stock) - 1
                if (response.stock !== 0) {
                    Item.updateOne({
                            _id: response._id
                        }, {
                            stock: tmp
                        })
                        .then(() => {
                            Cart.findOneAndUpdate({
                                    "user_id": req.logged_in_user._id
                                }, {
                                    $push: {
                                        carts: req.body.cart
                                    }
                                })
                                .then(() => {
                                    CartsControlller.getCarts(req, res)
                                        .then(function(data) {
                                            res.json(data)
                                        })
                                })
                        })
                } else {
                    res.status(500).json({
                        message: `Out of stock`
                    })
                }
            })
            .catch(function(err) {
                res.status(500).json({
                    status: 'error controllers/carts.js addToCart',
                    message: err
                })
            })
    };
    /** GET /carts */
    static getCarts(req, res) {
        Cart.findOne({ user_id: req.logged_in_user._id }).populate('carts').populate('user_id')
            .then(function(data) {
                res.json(data)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }
    static emptyCart(req, res) {
        Cart.findOneAndUpdate({
                user_id: req.logged_in_user.id
            }, {
                carts: []
            })
            .then((data) => {
                Cart.findOne({
                        user_id: req.logged_in_user.id
                    })
                    .then((response) => {
                        res.status(200).json(response)
                    })
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })
    }
}
module.exports = CartsControlller