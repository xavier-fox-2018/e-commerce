const mongoose = require('mongoose')
const Schema = mongoose.Schema

var cartSchema = new Schema({
    items: {
        type: String
    },
    quantity: {
        type:  Number
    },
    subTotal: {
        type: String
    }
}, {
    timestamps : true
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart