const mongoose = require('mongoose')
const Schema = mongoose.Schema
var ObjectId = mongoose.Schema.Types.ObjectId;
const cartSchema = new Schema({
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

//     itemList: [
//         {
//             item: {
//                 type: Schema.Types.ObjectId,
//                 ref: 'Item'
//             },
//             qty: {
//                 type: Number,
//                 default: 0
//             },
//             subTotal: {
//                 type: Number,
//                 default: 0
//             }
//         }
//     ]
// }

    isComplete : {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart