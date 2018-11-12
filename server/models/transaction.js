const mongoose = require('mongoose')
const { genSalt, hashingPassword } = require('../helpers/brcyrpt')
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
    member : { type : Schema.Types.ObjectId, ref : 'User'},
    item : { _id : {type : Schema.Types.ObjectId, ref : 'Item'}, number: { type : Number}, price :{ type: Number}}
},{ timestamps: true})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction