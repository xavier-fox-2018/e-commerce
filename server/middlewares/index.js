var Customer = require('../models/customers.js')
var Cart = require('../models/carts.js')
var Helper = require('../helpers/index.js')

class Middleware {
    static isAdmin(req, res, next) {
        let current = Helper.verifyToken(req.headers["token"])
        if (req.logged_in_user.role === "admin") {
            next()
        } else {
            next(res.status(401).json({
                message: `Not Authorized`
            }))
        }
    }
    static isLogin(req, res, next) {
        if (req.headers["token"] !== undefined) {
            let decoded = Helper.verifyToken(req.headers["token"]);
            Customer.findOne({
                    email: decoded.email
                })
                .then(function(data) {
                    if (data) {
                        req.logged_in_user = data
                        next()
                    } else {
                        next(res.status(401).json({
                            message: `Something went wrong`
                        }))
                    }
                })
                .catch(function(err) {
                    next(res.status(401).json({
                        message: `Something went wrong`
                    }))
                })
        } else {
            next(res.status(401).json({
                message: `Please signin firsts, token dari middleware : ${req.headers["token"]} `
            }))
        }
    }
    static isOwner(req, res, next) {
        let current = Helper.verifyToken(req.headers["token"])
        if (req.logged_in_user.id === req.params.user_id) {
            Cart.findOne({
                    user_id: current.id
                })
                .then(function(data) {
                    if (data) {
                        next()
                    } else {
                        next(res.status(401).json({
                            message: `Something went wrong`
                        }))
                    }
                })
                .catch(function(err) {
                    res.status(500).json({
                        message: err
                    })
                })
        } else {
            next(res.status(401).json({
                message: `Invalid user credentials`
            }))
        }

    }
}
module.exports = Middleware