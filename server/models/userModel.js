const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    is_oauth : {
        type : Boolean,
        default : false
    },
    is_admin : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

const User = mongoose.model('User',userSchema)

module.exports = User;