const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    cartItems: [{
        itemID: { type: Schema.Types.ObjectId, ref: 'Item' },
        subTotal: { type: Number, default: 0 },
        quantity: { type: Number, default: 0 }
    }],
    userID: { type: Schema.Types.ObjectId, ref: 'User' }, 
    totalPrice: { type: Number, default: 0 }, // ini di transaction aja, nnti bikin model baru
}, {timestamps: true})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
