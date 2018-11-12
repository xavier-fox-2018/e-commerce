const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      hash = require('bycjwt')


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    image: {
        type: String
    },
    money: {
        type: Number
    },
    role: {
        type: String
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    shop_list: [{
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    }]
},{
    timestamps: true
})


userSchema.pre('validate', function(next) {
    if (this.password.length < 6) {
        next(new Error('Password must be more than 5 characters'));
    } else {
        next();
    }
});

userSchema.post('validate', function() {
    this.password = hash.bcencode(this.password)
});

const User = mongoose.model('User', userSchema)
module.exports = User