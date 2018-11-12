const { isLogin} = require('../helper/gSignIn')
const Product = require('../models/product')

module.exports = {
    insert: (req,res) => {
        const newProduct = new Product ({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
            stock: req.body.stock,
            category: req.body.category,
            tag: req.body.tag,
        })
        newProduct.save()
        .then((product) => {
            res.status(200).json({
                product: product,
                message: `Product has been created`
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `Product creation failed`
            })
        })
    },
    findAll: (req,res) => {
        Product.find({})
        .then((products) => {
            let count = 0
            let productShown = []
            products.forEach(product => {
                if ( count < 8 ) {
                    productShown.push(product)
                }
                count++
            })
            res.status(200).json({
                product: productShown,
                message: `products has been found`
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `products can't be found`
            })
        })
    },
    findBy_id: (req,res) => {
        Product.findById(req.params.id)
        .then((product) => {
            res.status(200).json({
                product: product,
                message: `a Product has found `
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `User can't be found`
            })
        })
    },
    update: (req,res) => {
        Product.updateOne(
            { _id: req.params.id},
            { 
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                image: req.body.image,
                stock: req.body.stock,
                category: req.body.category,
                tag: req.body.tag,
            },   
        )
        .then((product) => {
            Product.findOne({ _id: req.params.id})
            .then((result) => {
                res.status(200).json({
                    result,
                    message: `Product detail has been updated`
                })
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `failed updating Product detail`
            })
        })
    },
    remove: (req,res) => {
        Product.findOne({ _id: req.params.id})
        .then((product) => {
            Product.deleteOne({_id: req.params.id})
            .then((result) => {
                res.status(200).json({
                    product,
                    message: `Product detail has been deleted`
                })
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `Product failed to delete`
            })
        })
    },
    signIn: (req,res) => {
        Product.findOne({where: {
            email: req.body.email,
        }})
        .then((user) => {
            if (bcrypt.compareSync(req.body.password, user.password) === true ) {
                const token = jwt.sign({user}, "IniRahasiaKitaYa")
                res.status(201).json({
                    user: user,
                    token: token
                })
            }
            else {
                let err = {
                    message: 'Username or password wrong'
                }
                res.status(400).json(err)
            }
        })
        .catch((err)=> {
            // console.log(err)
            res.status(400).json({
                message: err.message
            })
        })
    },

    findBy_name: function(req,res) {
        Product.find({
            name: req.params.name,
            // category: req.body.category
        })
        // .populate('Category')
        .then((products) => {
            res.status(200).json({
                products
            })
        })
        .catch((err) => {
            res.status(404).json({
                err,
                message: `Product name not found`
            })
        })
    },
    findBy_category: function(req,res) {
        Product.find({
            category: req.params.category,
            // category: req.body.category
        })
        // .populate('Category')
        .then((products) => {
            res.status(200).json({
                products
            })
        })
        .catch((err) => {
            res.status(404).json({
                err,
                message: `Category not found`
            })
        })
    }
}