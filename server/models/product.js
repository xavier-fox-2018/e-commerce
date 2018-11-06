const mongoose = require('mongoose')
const schema = mongoose.Schema

var productSchema = new schema({
    name: String,
    description: String,
    stock: number,
    price: number,
    tag:[],
    createdAt: new Date(),
    updatedAt: new Date(),
    picture:[]
})

var product = mongoose.model('Product', productSchema)

module.exports = product