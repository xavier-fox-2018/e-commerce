var Customer = require('../models/customers.js')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const request = require('request');
const Helper = require('../helpers/index.js')
const Cart = require('../models/carts.js')
class CustomersController {
    /* POST /customers/signup */
    static signup(req, res) {
        // res.json(req.body)
        let obj = Helper.cryptoPass(req.body.password)
        Customer.findOne({
                email: req.body.email
            })
            .then(function(data) {
                if (!data) {
                    Customer.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: obj.pass,
                        oauth: false,
                        salt: obj.salt,
                        role: 'customer',
                        money: 0
                    }, function(err) {
                        if (err) {
                            console.log(err);
                            res.status(500).json({
                                message: err
                            })
                        } else {
                            res.status(200).json({
                                message: 'Signup successfull'
                            })
                        }
                    })
                } else {
                    res.status(500).json({
                        message: 'Email already taken'
                    })
                }
            })
            .catch(function(err) {
                res.status(500).json({
                    message: err
                })
            })
    }

    /** POST /customers/signin */
    static signin(req, res) {
        Customer.findOne({ email: req.body.email })
            .then(function(data) {
                if (data) {
                    let pass = Helper.getCryptedPass(req.body.password, data.salt)
                    if (data.password === pass && data.role === "customer") {
                        let obj = {
                            id: data.id,
                            email: req.body.email,
                            password: pass,
                            role: data.role,
                            money: data.money
                        }
                        let token = Helper.getToken(obj);
                        Cart.findOne({
                                user_id: data.id
                            })
                            .then((response) => {
                                if (!response) {
                                    Cart.create({
                                            carts: [],
                                            user_id: data.id
                                        })
                                        .then(() => {
                                            res.status(200).json({
                                                token: token
                                            })
                                        })
                                } else {
                                    res.status(200).json({
                                        token: token
                                    })
                                }
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    status: 500,
                                    message: err.message
                                })
                            })

                    } else {
                        res.status(500).json({
                            message: `Incorrect password`
                        })
                    }
                } else {
                    res.status(500).json({
                        message: `Incorrect Email`
                    })
                }
            })
            .catch(function(err) {
                res.status(500).json({
                    message: err
                })
            })
    }
    static signinAdmin(req, res) {
            Customer.findOne({ email: req.body.email })
                .then(function(data) {
                    if (data) {
                        let pass = Helper.getCryptedPass(req.body.password, data.salt)
                        if (data.password === pass && data.role === "admin") {
                            let obj = {
                                id: data.id,
                                email: req.body.email,
                                password: pass,
                                role: data.role
                            }
                            let token = Helper.getToken(obj);
                            res.status(200).json({
                                token: token
                            })
                        } else {
                            res.status(401).json({
                                message: `Incorrect password`
                            })
                        }
                    } else {
                        res.status(401).json({
                            message: `Incorrect Email`
                        })
                    }
                })
                .catch(function(err) {
                    res.status(500).json({
                        message: err
                    })
                })
        }
        /** POST /customers/gsignin */
    static gsignin(req, res) {
        client.verifyIdToken({
            idToken: req.body.gtoken,
            audience: process.env.CLIENT_ID
        }, function(err, result) {
            if (err) {
                res.status(500).json({
                    status: 'error from server controllers/users.js gsignin',
                    message: err
                })
            } else {
                const payload = result.getPayload(); //udah bisa dapet name sama Email
                const userid = payload['sub'];
                Customer.findOne({ email: payload.email })
                    .then(function(data) {
                        let obj = {
                            email: payload.email
                        }
                        let token = Helper.getToken(obj)
                        if (data) {
                            res.json({
                                token: token
                            })
                        } else {
                            Customer.create({
                                    name: payload.name,
                                    email: payload.email,
                                    password: null,
                                    oauth: true,
                                    salt: null
                                })
                                .then(function() {
                                    res.status(200).json({
                                        token: token
                                    })
                                })
                        }
                    })
                    .catch(function(err) {
                        res.status(500).json({
                            status: 'error from server controllers/users.js gsignin',
                            message: err
                        })
                    })
            }
        });
    }
    static getCustomer(req, res) {
        Customer.findOne({
                _id: req.logged_in_user.id
            })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })
    }
}
module.exports = CustomersController