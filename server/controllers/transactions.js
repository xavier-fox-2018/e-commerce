var Cart = require('../models/carts.js')
var Transaction = require('../models/transactions.js')
var Customer = require('../models/customers.js')
class TransactiosController {
    static createTransaction(req, res) {
        let result = 0
        for (var i = 0; i < req.body.items.length; i++) {
            var element = req.body.items[i];
            result += Number(element.price)
        }
        // res.json(result)
        if (result < req.logged_in_user.money) {
            Cart.findOneAndUpdate({
                    user_id: req.logged_in_user.id
                }, {
                    carts: []
                })
                .then(() => {
                    Transaction.create({
                            user_id: req.logged_in_user.id,
                            createdAt: new Date(),
                            items: req.body.items,
                            total: result
                        })
                        .then(() => {
                            req.logged_in_user.money = req.logged_in_user.money - result
                            Customer.findOneAndUpdate({
                                    _id: req.logged_in_user.id
                                }, {
                                    money: req.logged_in_user.money
                                })
                                .then(() => {
                                    Transaction.find({
                                            user_id: req.logged_in_user.id
                                        })
                                        .then((response) => {
                                            res.status(200).json(response)
                                        })
                                })
                        })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: err
                    })
                })
        } else {
            res.status(500).json({
                message: `Insufficient Amount Of Money`
            })
        }

    }
    static getTransactions(req, res) {
        Transaction.find({
                user_id: req.logged_in_user.id
            })
            .then((response) => {
                res.status(200).json(response)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })
    }
}
module.exports = TransactiosController