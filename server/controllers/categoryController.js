const Category = require('../models/category.js')

class CategoryController {
    static create(req, res) {
        Category.create({
            name: req.body.name
        })
        .then( newCategory => {
            res.status(200).json({data: newCategory})
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static read(req, res) {
        Category.find()
        .then(allCategories => {
            res.status(200).json(allCategories)
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static update(req, res) {
        Category.updateOne({ _id: req.params.itID},
        {
            name: req.body.name
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static findCategory(req, res) {
        Category.findOne({ _id: req.params.categoryID})
        .populate('items')
        .then( data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }


    static delete(req, res) {
        Category.deleteOne({ _id: req.params.categoryID })
        .then( response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }
}


module.exports = CategoryController