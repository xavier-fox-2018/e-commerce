const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: String,
    items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category