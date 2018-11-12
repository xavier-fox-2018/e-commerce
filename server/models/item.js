const mongoose = require('mongoose')
const { genSalt, hashingPassword } = require('../helpers/brcyrpt')
const Schema = mongoose.Schema;


const itemSchema = new Schema({
    name :{
        type :  String,
        required : [true, 'Sorry, name must be filled!']
    },
    description : {
        type : String,
        required : [true, 'Sorry, descriptions must be filled!']
    },
    stock : {
        type : Number,
        required : [true, 'Sorry, stock must be filled!'],
        min : [0, 'Sorry, minimal stock is 0 ']
    },
    price : {
        type : Number,
        required : [true, 'Sorry, price must be filled!'],
        min : [0, 'Sorry, minimal stock is 0 ']
    },
    url :{
        type : String
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item