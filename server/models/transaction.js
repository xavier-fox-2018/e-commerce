const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const transactionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item_list: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },
        shop_id: {
            type: Schema.Types.ObjectId,
            ref: 'Shop'
        },
        quantity: {
            type: Number
        },
        price: {
            type: Number
        }
    }],
    total: {
        type: Number
    }
    
}, {
    timestamps: true
})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction