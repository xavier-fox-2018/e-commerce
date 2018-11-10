const User = require('../models/userModel.js');
const Cart = require('../models/cartModel.js');
const jwt = require('jsonwebtoken');
const encryptPassword = require('../helpers/encryptPassword.js');

class UserController {
    static register(req, res) {
        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        user.save()
            .then(function(user) {
                Cart.create({user: user._id})
                    .then(function(cart) {
                        const response = {
                            success: true,
                            message: `Account ${user.username} registered`
                        }
                        res.status(201).json(response);
                    })
                    .catch(function(err) {
                        console.log('Create Cart Error: ', err);
                        res.status(500).json(err.message);
                    });
            })
            .catch(function(err) {
                console.log('Register Error: ', err);
                res.status(500).json(err);
            });
    }

    static login(req, res) {
        req.body.password = encryptPassword(req.body.password);

        User.findOne({
            email: req.body.email,
            password: req.body.password
        })
            .then(function(user) {
                if (user) {
                    const token = jwt.sign({id: user._id, username: user.username, email: user.email}, process.env.JWT_KEY);
                    res.status(201).json({
                        token: token,
                        role: user.role
                    });
                } else {
                    const err = {
                        message: 'Wrong username or password'
                    };
                    res.status(400).json(err);
                }
            })
            .catch(function(err ){
                console.log('Find User While Login Error: ', err);
                res.status(500).json(err);
            });
    }

    static getProfile(req, res) {
        User.findById(req.user._id)
            .then(function(user) {
                res.status(200).json(user);
            })
            .catch(function(err) {
                console.log('Find User While Getting Profile Error: ', err);
                res.status(500).json(err);
            });
    }
}

module.exports = UserController;