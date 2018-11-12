const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const productSchema = new Schema({
    name: String,
    description : String,
    category: String,
    stock: Number,
    price: Number
})

module.exports = Mongoose.model('Product', productSchema)