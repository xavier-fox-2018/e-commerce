const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    cartItems: [{
        item: { type: Schema.Types.ObjectId, ref: 'Item' },
        quantity: { type: Number, default: 0 },
        subTotal: {type : Number , default: 0}
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    checkOut : String
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart