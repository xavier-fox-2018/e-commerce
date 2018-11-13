var mongoose = require('mongoose');
require('dotenv').config()

const Schema = mongoose.Schema;
const itemsSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    image: String,
    category_id: { type: Schema.Types.ObjectId, ref: 'Category' }
})

const Item = mongoose.model('Item', itemsSchema)

module.exports = Item