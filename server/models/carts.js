var mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGOOSE_ACCESS, { useNewUrlParser: true });

const Schema = mongoose.Schema;
const cartSchema = new Schema({
    "user_id": { type: Schema.Types.ObjectId, ref: 'Customer' },
    "carts": [{ type: Schema.Types.ObjectId, ref: 'Item' }]
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart