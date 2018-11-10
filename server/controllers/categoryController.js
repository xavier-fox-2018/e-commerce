const Category = require('../models/categoryModel.js');

class CategoryController {
    static create(req, res) {
        Category.create({
            name: req.body.name
        })
            .then(function(category) {
                res.status(201).json({
                    success: true,
                    message: `Successfully created category ${category.name}`
                });
            })
            .catch(function(err) {
                console.log('Create Category Error: ', err);
                res.status(500).json(err);
            });
    }

    static getAll(req, res) {
        Category.find().populate('itemList')
            .then(function(categories) {
                res.status(200).json(categories);
            })
            .catch(function(err) {
                console.log('Get All Categories Error: ', err);
                res.status(500).json(err);
            });
    }

    static getOne(req, res) {
        Category.findById(req.params.id).populate('itemList')
            .then(function(category) {
                res.status(200).json(category);
            })
            .catch(function(err) {
                console.log('Get One Category Error: ', err);
                res.status(500).json(err);
            });
    }

    static update(req, res) {
        Category.updateOne({_id: req.params.id}, {
            name: req.body.name
        })
            .then(function(result) {
                res.status(200).json({
                    result: result,
                    message: `Successfully updated category`
                });
            })
            .catch(function(err) {
                console.log('Update Category Name Error: ', err);
                res.status(500).json(err);
            });
    }

    static delete(req, res) {
        Category.deleteOne({_id: req.params.id})
            .then(function(result) {
                res.status(200).json({
                    result: result,
                    message: `Successfully deleted category`
                });
            })
            .catch(function(err) {
                console.log('Delete Category Error: ', err);
                res.status(500).json(err);
            });
    }
}

module.exports = CategoryController;