const Product = require('../models/product')
const Category = require('../models/category')

class ProductController {
  static addProduct(req, res, next) {
    console.log(req)
    
    Product.create({
      name: req.body.name,
      description: req.body.description,
      stock: Number(req.body.stock),
      price: Number(req.body.price),
      img: `http://localhost:3000/${req.file.filename}`
    })
      .then(data => {
        Category.updateOne({
          _id: req.body.category
        }, {
            $push: {
              products: data._id
            }
          }, (err, raw) => {
            console.log(req.body.category)
            res.status(201).json({
              result: data,
              error: null
            })
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

  }
}

module.exports = ProductController