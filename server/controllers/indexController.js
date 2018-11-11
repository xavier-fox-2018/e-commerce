const categoryModel = require('../models/category')
const itemModel = require('../models/product')
const cartModel = require('../models/cart')

class Controller {
    static getAllData(req, res){
        Promise.all([categoryModel.find(), itemModel.find()])
        .then(data => {
            let filtered = data[1].map(val => ({
                name: val.name,
                description: val.description,
                stock: val.stock,
                price: val.price,
                picture: 'http://localhost:3000/' + val.picture,
                id: val._id,
                category: val.category
            }))
            res.json({
                item: filtered,
                category: data[0]
            })
        })
        .catch(err => {
           res.send(err)
        })
    }

    static getItemCategory(req,res){
        itemModel.find({
            category: req.body.category
        })
        .populate('category')
        .then(data => {
            let filtered = data.map(val => ({
                name: val.name,
                description: val.description,
                stock: val.stock,
                price: val.price,
                picture: 'http://localhost:3000/' + val.picture,
                id: val._id,
                category: val.category
            }))
            res.send(filtered)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }
}

module.exports = Controller