const mongoose = require('mongoose')
const schema = mongoose.Schema

var cartSchema = new schema({
    belongsTo: String,
    items: [],
    isPaid: false
})

var Cart = mongoose.model('Cart', cartSchema)