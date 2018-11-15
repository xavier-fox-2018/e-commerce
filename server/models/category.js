const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: String,
    product:[{type: Schema.Types.ObjectId, ref: "Product" }]
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category