var models = require('../models/carts.js');
var jwt = require('jsonwebtoken');
require('dotenv').config();
var request = require('request');
var mongoose = require('mongoose');

class CartsControlller {
    /** POST /carts/addToCart */
    static addToCart(req, res) {
        let token = req.headers["token"]
        let decode = jwt.verify(token, process.env.JWT_SECRET)
        models.findOne({ user_id: decode.id })
            .then(function(data) {
                if (data !== null) {
                    models.updateOne({ "user_id": mongoose.Types.ObjectId(decode.id) }, { $push: { carts: mongoose.Types.ObjectId(req.body.cart) } })
                        .then(function(data) {
                            res.status(200).json(data)
                        })
                } else {
                    models.create({ carts: mongoose.Types.ObjectId(req.body.cart), user_id: mongoose.Types.ObjectId(decode.id) })
                        .then(function(data) {
                            res.status(200).json(data)
                        })
                }
            }).catch(function(err) {
                res.status(500).json('error controllers/carts.js addToCart')
            })
    };
    /** GET /carts */
    static getCarts(req, res) {
        let token = req.headers["token"]
        let decode = jwt.verify(token, process.env.JWT_SECRET)
        models.findOne({ user_id: decode.id }).populate('carts').populate('user_id')
            .then(function(data) {
                res.json(data)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }
}
module.exports = CartsControlller