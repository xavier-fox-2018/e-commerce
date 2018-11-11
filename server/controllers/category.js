const Category = require('../models/category.js');

class CategoryController {

    static create(req, res) {
        Category.create({
            name: req.body.name
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
        Category.find()
            .then(function(resolve) {
                res.status(201).json(resolve)
            })
            .catch(function(reject) {
                res.status(500).json(reject.message)
            });
    }

}

module.exports = CategoryController;