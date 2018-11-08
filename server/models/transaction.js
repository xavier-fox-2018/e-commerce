const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    items: [{
        id: String,
        name: String,
        price: Number,
        qty: Number
    }],
    total: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Waiting Payment'
    }
}, {
    timestamps: true
});

var Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction;

