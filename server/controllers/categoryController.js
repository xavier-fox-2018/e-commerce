const Category = require('../models/category.js');
const helper = require('../helper/helper.js')

class CategoryController {

  static create (req, res) {
    Category
      .create({
        name : req.body.name
      })
      .then((response) => {
        res.status(201).json({
          msg : 'Category created successfully'
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static delete (req, res) {
    Category
      .deleteOne({
        _id : req.params.id
      })
      .then(response => {
        res.status(200).json({
          msg : 'Category successfully deleted'
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static show (req, res) {
    Category
      .find({})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  
  static update (req, res) {
    Category
      .findById(req.params.id)
      .then(result => {
        res.status(200).json(result)
        result.name = req.body.name;
        return result.save()
      })
      .then(() => {
        res.status(200).json({
          msg : 'category updated'
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  
}

module.exports = CategoryController;