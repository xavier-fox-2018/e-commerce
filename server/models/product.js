const mongoose = require('mongoose')
const schema = mongoose.Schema

var productSchema = new schema({
    name: String,
    description: String,
    stock: Number,
    price: Number,
    tag: [],
    category: {type: schema.Types.ObjectId, ref: 'Category'},
    createdAt: String,
    updatedAt: String,
    picture: String
})

var Product = mongoose.model('Product', productSchema)

module.exports = Product