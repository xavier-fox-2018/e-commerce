const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    cartItems: [{
        item: { type: Schema.Types.ObjectId, ref: 'Item' },
        quantity: { type: Number, default: 0 },
        subTotal: {type : Number , default: 0}
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    totalPrice : Number
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction