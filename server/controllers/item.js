const Item = require('../models/item.js');
const multer = require('multer');

class ItemController {

    static create(req, res) {
        Item.create({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            CategoryId: req.body.CategoryId
        })
            .then(function(resolve) {
                res.status(201).json(resolve)
            })
            .catch(function(reject) {
                res.status(500).json(reject.message)
            });
    }

    static update(req, res) {

    }

    static delete(req, res) {

    }

    static getAll(req, res) {
        Item.find()
            .populate('CategoryId')
            .then(function(resolve) {
                res.status(201).json(resolve)
            })
            .catch(function(reject) {
                res.status(500).json(reject.message)
            });
    }

    static delete(req, res) {
        Item.deleteOne({
            _id: req.params.ItemId
        })
            .then(function(resolve) {
                res.status(201).json(resolve)
            })
            .catch(function(reject) {
                res.status(500).json(reject.message)
            });
    }

}

module.exports = ItemController;