var mongoose = require('mongoose');
require('dotenv').config()

const Schema = mongoose.Schema;
const transactionSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "Customer" },
    createdAt: Date,
    total: Number,
    items: { type: Array }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction