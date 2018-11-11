var Item = require('../models/items.js')
class ItemsController {
    /* POST /items */

    static createItem(req, res) {

        Item.create({
                name: req.body.name,
                description: req.body.description,
                price: Number(req.body.price),
                stock: Number(req.body.stock),
                category_id: req.body.category_id,
                image: req.file.cloudStoragePublicUrl
            })
            .then(function(data) {
                Item.find({})
                    .then((response) => {
                        res.status(200).json(response)
                    })
            })
            .catch(function(err) {
                res.status(500).json({
                    status: 'server error post items',
                    message: err
                })
            })
    }

    /** GET /items */
    static getItems(req, res) {
        Item.find().populate('category_id')
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(err) {
                res.status(500).json({
                    status: 'server error get items',
                    message: err
                })
            })
    };
    static updateItem(req, res) {
        Item.findByIdAndUpdate({ _id: req.params.id }, {
                name: req.body.name,
                description: req.body.description,
                price: Number(req.body.price),
                stock: Number(req.body.stock),
                category_id: req.body.category_id,
                image: req.file.cloudStoragePublicUrl
            }, { new: true })
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(err) {
                res.status(500).json({
                    status: 'server error put items',
                    message: err
                })
            })
    }
    static deleteItem(req, res) {
        Item.deleteOne({ _id: req.params.id })
            .then(function(data) {
                Item.find({})
                    .then((response) => {
                        res.status(200).json(response)
                    })
            })
            .catch(function(err) {
                res.status(500).json({
                    status: 'server error delete items',
                    message: err
                })
            })
    }
    static search(req, res) {
        Item.find({
                name: req.params.name
            })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })
    }
}
module.exports = ItemsController