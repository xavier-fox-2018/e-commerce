const mongoose = require('mongoose')
const Schema = mongoose.Schema

var addStock = new Schema({
    category: String,
    name: String,
    price: Number,
    stock: String,
    image: String
})
var Stocks = mongoose.model('Stocks', addStock);
module.exports = Stocks