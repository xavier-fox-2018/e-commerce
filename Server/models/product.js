const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type:  Number
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    category: {
        type: String
    },
    stock: {
        type: Number
    },
    tag: {
        type: String
    }
}, {
    timestamps : true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product