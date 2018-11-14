const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        itemId: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },
        name: {
            type: String
        },
        price: {
            type: Number
        },
        qty: {
            type: Number
        },
        subTotal: {
            type: Number
        }
    }],
    shippingName: {
        type: String
    },
    shippingAddress: {
        type: String
    },
    shippingCourir: {
        type: String
    },
    shippingCost: {
        type: Number
    },
    paymentTotal: {
        type: String
    },
    paymentName: {
        type: String,
    },
    paymentStatus: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

var Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction;

