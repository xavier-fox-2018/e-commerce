const Category = require('../models/category')

class CategoryController {
    
    static getAll(req, res) {        
        Category.find()
            .then(categories => {
                res.status(200).json(categories)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: 'error while loading category',
                    err
                })
            })
    }

    static create(req, res) {
        Category.create({
            name: req.body.name
        })
        .then(category => {
            res.status(201).json(category)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static delete(req, res) {
        Category.findByIdAndDelete(req.params.id)
            .then(category => {
                res.status(201).json(category)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        })
        .then(category => {
            res.status(201).json(category)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = CategoryController