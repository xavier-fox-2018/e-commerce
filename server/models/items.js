const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name must be required'],
        unique: [true, 'Item already exists']
    },
    description: {
        type: String,
        required: [true, 'Description must be required']
    },
    price: {
        type: Number,
        required: [true, 'Price must be required']
    },
    stock: {
        type: Number,
        default: 0
    },
    image: {
        type: String
        // ,required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category must be required']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

var Item = mongoose.model('Item', itemSchema)

module.exports = Item;