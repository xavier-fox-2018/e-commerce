var models = require('../models/customers.js')
var crypto = require("crypto");
var jwt = require('jsonwebtoken');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const request = require('request');

class CustomersController {
    /* POST /customers/signup */
    static signup(req, res) {
        let _salt = crypto.randomBytes(256).toString('hex')
        let pass = crypto.createHmac('sha256', _salt).update(req.body.password).digest('hex')
        models.findOne({ email: req.body.email })
            .then(function(data) {
                if (!data) {
                    models.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: pass,
                        oauth: false,
                        salt: _salt,
                        money: 0
                    }, function(err) {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err.message)
                        } else {
                            res.status(200).json('Signup successfull')
                        }
                    })
                } else {
                    res.status(500).json('Email already taken')
                }
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }

    /** POST /customers/signin */
    static signin(req, res) {
        models.findOne({ email: req.body.email })
            .then(function(data) {
                if (data) {
                    let pass = crypto.createHmac('sha256', data.salt).update(req.body.password).digest('hex')
                    if (data.password === pass) {
                        let obj = {
                            id: data.id,
                            email: req.body.email,
                            password: pass
                        }
                        let token = jwt.sign(obj, process.env.JWT_SECRET);
                        res.status(200).json(token)
                    } else {
                        res.status(500).json(`Incorrect password`)
                    }
                } else {
                    res.status(500).json(`Incorrect Email`)
                }
            })
            .catch(function(err) {
                res.status(500).json(`Error from controllers/customers signin`)
            })
    }

    /** POST /customers/gsignin */
    static gsignin(req, res) {
        client.verifyIdToken({
            idToken: req.body.gtoken,
            audience: process.env.CLIENT_ID
        }, function(err, result) {
            if (err) {
                res.status(500).json('error from server controllers/users.js gsignin')
            } else {
                const payload = result.getPayload(); //udah bisa dapet name sama Email
                const userid = payload['sub'];
                models.findOne({ email: payload.email })
                    .then(function(data) {
                        let obj = {
                            email: payload.email
                        }
                        let token = jwt.sign(obj, process.env.JWT_SECRET);
                        if (data) {
                            res.json(token)
                        } else {
                            models.create({
                                    name: payload.name,
                                    email: payload.email,
                                    password: null,
                                    oauth: true,
                                    salt: null
                                })
                                .then(function() {
                                    res.status(200).json(token)
                                })
                        }
                    })
                    .catch(function(err) {
                        res.status(500).json('error from server controllers/users.js gsignin')
                    })
            }
        });
    }

}
module.exports = CustomersController