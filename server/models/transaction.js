const mongoose = require('mongoose')
const Schema = mongoose.Schema
var ObjectId = mongoose.Schema.Types.ObjectId;
const transactionSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    products: [
        {
            productId: {
                type: ObjectId,
                ref: 'Product'
            },
            qty: {
                type: Number,
                default: 0
            },
            price: {
                type: Number
            }
        }
    ],
    total: Number
},{
    timestamps: true
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction