const mongoose = require('mongoose')
const schema = mongoose.Schema

var productSchema = new schema({
    name: String,
    description: {
        type: String,
        minlength: 5,
        maxlength: 100
    },
    stock: Number,
    price: Number,
    tag: [],
    createdAt: String,
    updatedAt: String,
    picture: []
})

var product = mongoose.model('Product', productSchema)

module.exports = product