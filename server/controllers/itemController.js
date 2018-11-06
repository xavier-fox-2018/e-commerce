const Item = require('../models/itemModel.js');

class ItemController {
    static add(req, res) {
        Item.create({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            imgURL: req.body.imgURL
        })
            .then(function(item) {
                res.status(201).json({
                    success: true,
                    message: `Successfully added item ${item.name}`
                });
            })
            .catch(function(err) {
                console.log('Add Item Error: ', err);
                res.status(500).json(err);
            });
    }

    static getAll(req, res) {
        Item.find()
            .then(function(items) {
                res.status(200).json(items);
            })
            .catch(function(err) {
                console.log('Get All Items Error: ', err);
                res.status(500).json(err);
            });
    }

    static getOne(req, res) {
        Item.findById(req.params.id)
            .then(function(item) {
                res.status(200).json(item);
            })
            .catch(function(err) {
                console.log('Find Item By Id Error: ', err);
                res.status(500).json(err);
            });
    }

    static update(req, res) {
        Item.updateOne({_id: req.params.id}, {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock
        })
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                console.log('Update Item Error: ', err);
                res.status(500).json(err);
            });
    }

    static delete(req, res) {
        Item.findByIdAndDelete(req.params.id)
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                console.log('Delete Item Error: ', err);
                res.status(500).json(err);
            });
    }

    static searchByName(req, res) {
        Item.find({name: new RegExp(req.params.keyword, 'i')})
            .then(function(items) {
                res.status(200).json(items);
            })
            .catch(function(err) {
                console.log('Search Item Error: ', err);
                res.status(500).json(err); 
            });
    }
}

module.exports = ItemController;