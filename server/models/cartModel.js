const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    itemList: [
        {
            item: {
                type: Schema.Types.ObjectId,
                ref: 'Item'
            },
            qty: {
                type: Number,
                default: 0
            },
            subTotal: {
                type: Number,
                default: 0
            }
        }
    ]
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;