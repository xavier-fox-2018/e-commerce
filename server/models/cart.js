const mongoose = require('mongoose')
const schema = mongoose.Schema

var cartSchema = new schema({
    userId: {type: schema.Types.ObjectId, ref:'User'},
    items: [{type: schema.Types.ObjectId, ref:'Product'}],
    isPaid: false
})

var Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart