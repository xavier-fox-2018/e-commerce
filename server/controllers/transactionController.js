const Transaction = require('../models/transactionModel.js');
const Cart = require('../models/cartModel.js');

class TransactionController {
    static create(req, res) {
        Cart.findOne({user: req.user._id})
            .then(function(cart) {
                let totalPrice = 0;

                for (let i = 0; i < cart.itemList.length; i++) {
                    totalPrice += cart.itemList[i].subTotal;
                }

                Transaction.create({
                    user: req.user._id,
                    itemList: cart.itemList,
                    totalPrice: totalPrice
                })
                    .then(function(transaction) {
                        Cart.updateOne({user: req.user._id}, {
                            "$set": {
                                "itemList": []
                            }
                        }, {safe: true, multi: true})
                            .then(function(result) {
                                res.status(200).json(transaction);
                            })
                            .catch(function(err) {
                                console.log('Update To Empty Cart After Checkout Error: ', err);
                                res.status(500).json(err);
                            });
                    })
                    .catch(function(err) {
                        console.log('Create Transaction Error: ', err);
                        res.status(500).json(err);
                    });
            })
            .catch(function(err) {
                console.log('Find Cart To Checkout Error: ', err);
                res.status(500).json(err);
            });
    }

    static getAll(req, res) {
        Transaction.find()
            .then(function(transactions) {
                res.status(200).json(transactions);
            })
            .catch(function(err) {
                console.log('Find All Transactions Error: ', err);
                res.status(500).json(err);
            });
    }

    static findByUser(req, res) {
        Transaction.find({user: req.user._id}).populate('user itemList.item')
            .then(function(transaction) {
                res.status(200).json(transaction);
            })
            .catch(function(err) {
                console.log('Find User Transactions Error: ', err);
                res.status(500).json(err);
            });
    }
}

module.exports = TransactionController;