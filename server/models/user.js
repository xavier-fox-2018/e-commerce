const mongoose = require('mongoose')
const { genSalt, hashingPassword } = require('../helpers/brcyrpt')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name :{
        type :  String,
        required : [true, 'Sorry, name must be filled!']
    },
    email : {
        type : String,
        required : [true, 'Sorry, email must be filled!']
    },
    password : {
        type : String,
        required : [true, 'Sorry, password must be filled!']
    },
    role : {
        type : String,
        default : 'member'
    },
    carts : [ { _id: {type : Schema.Types.ObjectId, ref : 'Item'}, number: {type: Number} }]
})

const User = mongoose.model('User', userSchema)

module.exports = User