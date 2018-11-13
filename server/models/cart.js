const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const cartSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    item_list: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },
        quantity: {
            type: Number
        }
    }],
    total: {
        type: Number
    }
},{
    timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart