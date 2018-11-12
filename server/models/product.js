const mongoose = require('mongoose')
const Schema = mongoose.Schema
var ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: null
    },

    price: {
        type: Number
    },

    discount: {
        type: Number,
        default: 0
    },

    stock: {
        type: Number,
        required: true,
        min: [0, 'product not available']
    },

    category: {
        type: ObjectId,
        ref: 'Category'
    }

}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product