const mongoose = require('mongoose')
const Schema = mongoose.Schema

var addUser = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String ,
    rule: String
})
var Users = mongoose.model('Users', addUser);
module.exports = Users