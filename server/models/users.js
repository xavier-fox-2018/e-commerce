const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

var isEmail = function(val) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name must be required']
    },
    email:  {
        type: String,
        unique: [true, `email is already exists`],
        required: [true, 'Email must required'],
        validate: [isEmail, 'Please input correct email']
    },
    password: {
        type: String,
        minlength:[5, 'password min 5 character'],
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    picture: {
        type: String,
        default: 'https://www.google.co.id/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwj1lu_VzMveAhULOI8KHTzqAnYQjRx6BAgBEAU&url=http%3A%2F%2Fpcm.um.edu.my%2Fstaff-and-student%2Fzuraini%2Fempty-avatar-700x480%2F&psig=AOvVaw0g9aQrpXVm3tU-oW50e7dK&ust=1542000215199212'
    },
    cart: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },
        qty: {
            type: Number
        }
    }],
    transaction: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
}, {
    timestamps: true
});

userSchema.pre('save', function(next){
    var salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
    // console.log(this.password); 
    next()
  })

var User = mongoose.model('User', userSchema)

module.exports = User;