const Product = require('../models/product')
const Category = require('../models/category')

class ProductController {
  static addProduct(req, res, next) {
    Product.create({
      name: req.body.name,
      description: req.body.description,
      stock: Number(req.body.stock),
      price: Number(req.body.price),
      categoryId: req.body.category,
      img: `http://localhost:3000/${req.file.filename}`
    })
      .then(data => {
        res.status(201).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(400).json({
          result: null,
          error: error
        })
      })
  }
  static getProduct(req, res, next) {
    Product.find()
      .then(data => {
        res.status(200).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(200).json({
          result: null,
          error: error
        })
      })
  }

  static deleteProduct(req, res, next) {
    Product.findByIdAndDelete(req.params.id)
    .then(data => {
      res.status(200).json({
        result: data,
        error: null
      })
    })
    .catch(error => {
      res.status(500).json({
        result: null,
        error: error
      })
    })
  }

  static addCategory(req, res, next) {
    Category.create({
      name: req.body.name,
      products: []
    })
      .then(data => {
        res.status(201).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(400).json({
          result: null,
          error: error
        })
      })
  }

  static getCategory(req, res, next) {
    Category.find()
    .then(data => {
      res.status(201).json({
        result: data,
        error: null
      })
    })
    .catch(error => {
      res.status(400).json({
        result: null,
        error: error
      })
    })
  }
}

module.exports = ProductController