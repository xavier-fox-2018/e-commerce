const mongoose = require('mongoose')
const schema = mongoose.Schema

var categorySchema = new schema({
    name: {
        type: String,
        unique: true
    },
    products:[{type: schema.Types.ObjectId, ref:'Product'}]
})

var Category = mongoose.model('Category', categorySchema)
module.exports = Category 