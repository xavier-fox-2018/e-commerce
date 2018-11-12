const Mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    items : [],
    UserId : [{type : Schema.Types.ObjectId , ref: 'Products'}]
})

module.exports = Mongoose.model('cart', cartSchema)