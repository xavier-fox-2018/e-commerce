var mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGOOSE_ACCESS, { useNewUrlParser: true });

const Schema = mongoose.Schema;
const customerSchema = new Schema({
    "name": String,
    "email": {
        type: String,
        validate: {
            validator: function(v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: `Email is not a valid email!`,
        }
    },
    "password": String,
    "money": Number,
    "salt": String,
    "oauth": Boolean
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer