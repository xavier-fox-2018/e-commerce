const Item = require('../models/items')
const Category = require('../models/categories')

module.exports = {

    add: function(req, res){    
        Item.create({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            stock: req.body.stock,
            image: req.file.cloudStoragePublicUrl
        })
        .then((result) => {
            res.status(201).json({message: "Item added", data: result})
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    show: function(req, res){
        Item.find({
            isDeleted: false
        })
        .populate('category')
        .exec()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    edit: function(req, res){
        Item.updateOne({
            _id: req.params.id
        }, {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            stock: req.body.stock
        })
        .then((result) => {
            res.status(200).json({message: "Item Updated", data: result})
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    softDelete: function(req, res){
        Item.updateOne({
            _id: req.params.id
        }, {
            isDeleted: true
        })
        .then((result) => {
            res.status(200).json({message: "Item Deleted", data: result})
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    find: function(req, res){
        Item.findOne({
            _id: req.params.id,
            isDeleted: false
        })
        .populate('category')
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    getItemByCategory(req, res){
        Item.find({
            category: req.params.id,
            isDeleted: false
        })
        .populate('category','name')
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    search(req, res){
        var regexQuery = {
            name: new RegExp(req.params.q, 'i'),
            isDeleted: false
        }
        Item.find(regexQuery)
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    editWithImage(req, res){
        Item.updateOne({
            _id: req.params.id
        }, {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            stock: req.body.stock,
            image: req.file.cloudStoragePublicUrl
        })
        .then((result) => {
            res.status(200).json({message: "Item Updated", data: result})
        }).catch((err) => {
            res.status(500).json(err)
        });
    }   
}