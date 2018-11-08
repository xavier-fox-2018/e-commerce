const Item = require('../models/item.js')
const Category = require('../models/category.js')

class ItemController {
    static create(req, res) {
        Item.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            imageUrl: req.body.imageUrl,
            categoryID: req.body.categoryID
        })
        .then( newItem => {
            Category.updateOne({ _id : newItem.categoryID },
                {$push: {items: newItem._id}})
            .then(updatedData => {
                res.status(200).json({newItem, updatedData})
            })
            .catch(err => {
                res.status(500).json({err})
            })
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static read(req, res) {
        Item.find()
        .then(allItems => {
            res.status(200).json(allItems)
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static update(req, res) {
        Item.updateOne({ _id: req.params.itemID},
        {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            imageUrl: req.body.imageUrl
        })
        .then(response => {
            res.status(200).json({data: response})
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static delete(req, res) {
        Item.deleteOne({ _id: req.params.itemID })
        .then( response => {
            res.status(200).json({data: response})
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static findItem(req, res) {
        Item.find({name: req.params.itemName})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

}


module.exports = ItemController
