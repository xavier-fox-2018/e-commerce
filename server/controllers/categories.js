var Category = require('../models/categories.js')
const request = require('request');
const Helper = require('../helpers/index.js')

class CategoriesController {
    static createCategory(req, res) {
        Category.create({
                name: req.body.name
            })
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(err) {
                res.status(500).json({
                    status: 'server error post category',
                    message: err
                })
            })
    }
    static getCategory(req, res) {
        Category.find()
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(err) {
                res.status(500).json({
                    status: 'server error get category',
                    message: err
                })
            })
    }
    static updateCategory(req, res) {
        Category.updateOne({ _id: req.params.id }, {
                name: req.body.name
            })
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(err) {
                res.status(500).json({
                    status: 'server error put category',
                    message: err
                })
            })
    }
    static deleteCategory(req, res) {
        Category.deleteOne({ _id: req.params.id })
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(err) {
                res.status(500).json({
                    status: 'server error delete category',
                    message: err
                })
            })
    }
}
module.exports = CategoriesController