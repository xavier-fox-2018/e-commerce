
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item_list: [
        {
            item: {
                type: Schema.Types.ObjectId,
                ref: 'Item'
            },
            qty: {
                type: Number,
                default: 0
            },
            sub_total: {
                type: Number,
                default: 0
            }
        }
    ],
    total_price: Number
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;