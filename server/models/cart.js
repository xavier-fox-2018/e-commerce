const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    cartItems: [{
        item: { type: Schema.Types.ObjectId, ref: 'Item' },
        subTotal: { type: Number, default: 0 },
        quantity: { type: Number, default: 0 }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    totalPrice: { type: Number, default: 0 }, 
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
