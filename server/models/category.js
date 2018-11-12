const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const categorySchema = new Schema({
    name : {
        type: String,
        required: true
    },
    products : [{
        type: ObjectId,
        ref: 'Product'
    }]
}, {
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category