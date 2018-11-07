var mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGOOSE_ACCESS, { useNewUrlParser: true });

const Schema = mongoose.Schema;
const itemsSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number
})

const Item = mongoose.model('Item', itemsSchema)

module.exports = Item