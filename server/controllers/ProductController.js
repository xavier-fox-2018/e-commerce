const Product = require('../models/product')
const Category = require('../models/category')

class ProductController {
    
    static getAll(req, res) {        
        Product.find()
               .populate('category')
            .then(products => {
                res.status(200).json(products)
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
        Product.create({
            name: req.body.name,            
            description: req.body.description,   
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            stock: req.body.stock
        })
        .then(product => {
            Category.findByIdAndUpdate(req.body.category, {
                $push: {
                    products: product._id
                }
            })
            .then(_ => {
                res.status(201).json({message: 'succ create product'})
            })
            .catch(err => {
                res.status(500).json(err)
            })
            
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getProductCategory(req, res) {
        Category.findOne({
            _id: req.params.id
        })
        .populate('products')
        .then(categories => {
            res.status(200).json(categories.products)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static filterProducts (req, res) {
        Product.find({
            name: new RegExp(req.params.name, 'i')
        })
        .then(products => {
            res.status(200).json(products)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
 
    static delete(req, res) {
        Product.findByIdAndDelete(req.params.id)
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = ProductController