const cartModel = require('../models/cart')
const itemModel = require('../models/product')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class Controller {
    static addCart(req, res) {
        let user = jwt.verify(req.body.token, process.env.JWT_SECRET)
        cartModel.find({
            userId: user._id,
            isPaid: false
        })
            .then(data => {
                // console.log(req.body.item.id)
                if (data.length == 0) {
                    return cartModel.create({
                        userId: user._id,
                        items: [req.body.item.id],
                        isPaid: false
                    })
                } else {
                    return cartModel.update({
                        userId: user._id,
                        isPaid: false
                    }, {
                            $push: { items: req.body.item.id }
                        })
                }
            })
            .then(data => {
                return cartModel.find({
                    userId: user._id,
                    isPaid: false
                })
                    .populate('items')
            })
            .then(data => {
                res.send(data)
                // balikanya semua data cart dari user yang belum checkout terupdate                
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }

    static deleteCart(req, res) {
        cartModel.findOne({
            _id: req.body.idCart
        })
            .then(data => {
                let filtered = data.items.filter(val => {
                    return val == req.body.idItem
                })
                let origin = data.items.filter(val => {
                    return val != req.body.idItem
                })
                let sliced = filtered.slice(0, filtered.length - 1)

                for (let i = 0; i < sliced.length; i++) {
                    origin.push(sliced[i])
                }
                if (origin.length === 0) {
                    return cartModel.deleteOne({
                        _id: req.body.idCart
                    })
                } else {
                    return cartModel.update({
                        _id: req.body.idCart
                    }, {
                            items: origin
                        })
                }
            })
            .then(data => {
                let user = jwt.verify(req.body.token, process.env.JWT_SECRET)
                return cartModel.find({
                    userId: user._id,
                    isPaid: false
                })
                    .populate('items')
            })
            .then(data => {
                res.send(data)
                // balikanya semua data cart dari user yang belum checkout terupdate
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }

    static getUnpaidItem (req,res){
        let user = jwt.verify(req.body.token, process.env.JWT_SECRET)
        cartModel.find({
            userId:user._id,
            isPaid: false
        })
        .populate('items')
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }

    static getAllPaidItem(req,res){
        let user = jwt.verify(req.body.token, process.env.JWT_SECRET)
        cartModel.find({
            userId: user._id,
            isPaid: true,
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }

    static checkOut(req,res){
        let user = jwt.verify(req.body.token, process.env.JWT_SECRET)
        cartModel.findOne({
            userId: user._id,
            isPaid: false,
            _id: req.body.idCart
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }

    static submitCheckOut(req,res){
        let user = jwt.verify(req.body.token, process.env.JWT_SECRET)
        cartModel.update({
            userId: user._id,
            isPaid: false,
            _id: req.body.idCart
        }, {
            isPaid: true
        })
        .then(data => {
            return cartModel.findOne({
                user:user._id,
                _id: req.body.idCart
            })
        })
        .then(data => {
           res.send(data)
        })
        .catch(err => {
           res.status(500).send(err) 
        })
    }
}

module.exports = Controller