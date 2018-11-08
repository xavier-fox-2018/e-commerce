const userModel = require('../models/user')
const itemModel = require('../models/product')
const categoryModel = require('../models/category')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()


class Controller {

    static getAllItems(req, res) {
        itemModel.find({})
            .then(data => {
                let filtered = data.map(val => ({
                    name: val.name,
                    description: val.description,
                    stock: val.stock,
                    price: val.price,
                    picture: 'http://localhost:3000/' + val.picture,
                    id: val._id
                }))
                res.send(filtered)
            })
            .catch(err => {
                res.status(500).send(err.message)
            })
    }

    static signUp(req, res) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            role: 'User',
        })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send(err.message)
            })
    }

    static login(req, res) {
        console.log(req.body)
        userModel.findOne({
            email: req.body.email
        })
            .then(data => {
                if (data == null) {
                    res.status(403).send('wrong email')
                } else {
                    if (bcrypt.compareSync(req.body.password, data.password) == false) {
                        res.status(403).send('wrong password')
                    } else {
                        let token = jwt.sign(JSON.stringify(data), 'asd')
                        res.json({ token: token })
                    }
                }
            })
            .catch(err => {
                res.status(500).send('server error')
            })
    }

    //for admin
    static addItem(req, res) {
        itemModel.create({
            name: req.body.name,
            description: req.body.description,
            stock: Number(req.body.stock),
            price: Number(req.body.price),
            category: req.body.category,
            picture: req.file.filename
        })
            .then(data => {
                return categoryModel.update({
                    _id: req.body.category
                }, {
                        $push: { products: data._id }
                    })
            })
            .then(data => {
                res.send('ok')
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }

    static addCategory(req, res) {
        categoryModel.findOne({
            name: req.body.data
        })
            .then(data => {
                if (data) {
                    res.status(403).json({
                        msg: 'already exist'
                    })
                } else {
                    return categoryModel.create({
                        name: req.body.data
                    })
                }
            })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getCategory(req, res) {
        categoryModel.find({})
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send('err')
            })
    }

    static editItem(req, res) {
        console.log(req.file)
        console.log(req.body)
        itemModel.updateOne({
            _id: req.body.id
        }, {
                name: req.body.name,
                stock: Number(req.body.stock),
                price: Number(req.body.price),
                description: req.body.description,
                category: req.body.category,
                picture: req.file.filename
            })
            .then(data => {
                return itemModel.find({})
            })
            .then(data => {
                let filtered = data.map(val => ({
                    name: val.name,
                    description: val.description,
                    stock: val.stock,
                    price: val.price,
                    picture: 'http://localhost:3000/' + val.picture,
                    id: val._id
                }))
                res.send(filtered)
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }

    static deleteItem(req, res) {
        console.log(req.body)
        itemModel.deleteOne({
            _id: req.body.id
        })
            .then(data => {
                return itemModel.find({})
            })
            .then(data => {
                let filtered = data.map(val => ({
                    name: val.name,
                    description: val.description,
                    stock: val.stock,
                    price: val.price,
                    picture: 'http://localhost:3000/' + val.picture,
                    id: val._id
                }))
                res.send(filtered)
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }
}

module.exports = Controller