const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name Required"],
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		required: [true, "Email Required"]
	},
	password: {
		type: String,
		required: [true, "Password Required"]
	},
	role: {
		type: String,
		default: 'user'
	},
	avatar: {
		type: String,
		default : ''
	}
}, {
	timestamps: true,
	versionKey: false
});

UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' })

module.exports = mongoose.model('User', UserSchema);