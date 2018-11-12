const User = require('../models/user.js');
const pwdEncrypt = require('../helpers/pwdEncrypt.js');
const token = require('../helpers/jwt.js');

class UserController {

    static signup(req, res) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: pwdEncrypt.getEncrypt(req.body.password)
        })
            .then(function(resolve) {
                res.status(201).json(resolve)
            })
            .catch(function(reject) {
                res.status(500).json(reject.message)
            });
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email,
            password: pwdEncrypt.getEncrypt(req.body.password)
        })
            .then(function(resolve) {
                const dataToken = {
                    email: resolve.email
                };
                res.status(201).json({
                    token: token.getToken(dataToken)
                })
            })
            .catch(function(reject) {
                res.status(500).json(reject)
            });
    }

    static getUser(req, res) {
        let decryptJwt = token.verifToken(req.headers.token);
        User.findOne({
            email: decryptJwt.email
        })
            .populate('cart.Item')
            .then(function(resolve) {
                let dataUser = {
                    UserId: resolve._id,
                    name: resolve.name,
                    email: resolve.email,
                    cart: resolve.cart
                }
                res.status(201).json(dataUser)
            })
            .catch(function(reject) {
                res.status(500).json(reject)
            });
    }

    static isLogin(req, res) {
        if(req.headers.token) {
            let decryptJwt = token.verifToken(req.headers.token);
            User.findOne({
                email: decryptJwt.email
            })
                .then(function(resolve) {
                    if(resolve) {
                        let data = {
                            UserId: resolve._id,
                            name: resolve.name,
                            email: resolve.email
                        }
                        res.status(201).json(data);
                    }else{
                        res.status(500).json({
                            message: `Tidak ada otoritas`
                        });
                    }
                })
                .catch(function(reject) {
                    res.status(500).json({
                        message: reject.message
                    })
                });
        }else{
            res.status(500).json({
                message: `Tidak ada otoritas`
            });
        }
    }

    static cart(req, res) {
        let dataCart = {
            Item: req.body.ItemId,
            qty: 1
        }
        User.updateOne(
            {
                _id: req.body.UserId
            },
            {
                $push: {cart: dataCart}
            }
        )
            .then(function(resolve) {
                res.status(201).json(resolve)
            })
            .catch(function(reject) {
                res.status(500).json(reject)
            });
    }

}

module.exports = UserController;