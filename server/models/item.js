const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: String,
    description: String,
    price: {type: Number, default: 0},
    stock: {type: Number, default: 0},
    imageUrl: String,
    categoryID: String
}, {timestamps: true}) 

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;