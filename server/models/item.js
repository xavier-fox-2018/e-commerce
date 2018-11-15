const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    image: String,
    price: Number,
    stock: Number,
    CategoryId: { type: Schema.Types.ObjectId, ref: 'Category' }
}, {timestamps: true});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;