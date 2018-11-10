const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Item name is required']
    },
    price: {
        type: Number,
        required: [true, 'Item price is required']
    },
    stock: {
        type: Number,
        required: [true, 'Item stock is required']
    },
    imgURL: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Item category is required']
    }
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;