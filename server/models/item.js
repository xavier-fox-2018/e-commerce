const mongoose = require('mongoose')

const Schema = mongoose.Schema
const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: "//via.placeholder.com/600x400?text=Product"
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
		required: true
    }
})

const Item = mongoose.model('Item', itemSchema, 'Items')

module.exports = Item