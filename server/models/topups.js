var mongoose = require('mongoose');
require('dotenv').config()

const Schema = mongoose.Schema;
const topupSchema = new Schema({
    "user_id": { type: Schema.Types.ObjectId, ref: 'Customer' },
    "amount": Number,
    "validation": String,
    "status": String,
    "createdAt": Date
})

const Topup = mongoose.model('Topup', topupSchema)

module.exports = Topup