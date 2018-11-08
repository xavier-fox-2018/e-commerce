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
            image: 'https://static1.squarespace.com/static/56a213bbd82d5ee027b4a502/t/5876547429687f9d498d3908/1484149884650/coffee-lovers-1080p-hd-wallpaper.jpg?format=2500w'
            // image: req.file.cloudStoragePublicUrl
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
            _id: req.params.id,
            isDeleted: false
        }, {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            stock: req.body.stock,
            image: 'https://static1.squarespace.com/static/56a213bbd82d5ee027b4a502/t/5876547429687f9d498d3908/1484149884650/coffee-lovers-1080p-hd-wallpaper.jpg?format=2500w'
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
        console.log(req.params.q);
        
        var regexQuery = {
            name: new RegExp(req.params.q, 'i')
        }
        Item.find(regexQuery)
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    editWithImage(req, res){
        Item.update({
            _id: req.body.id,
            isDeleted: false
        }, {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            urlImage: req.file.cloudStoragePublicUrl
        })
        .then((result) => {
            res.status(200).json({message: "Item Updated"})
        }).catch((err) => {
            res.status(500).json(err)
        });
    }   
}