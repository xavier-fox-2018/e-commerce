const TransactionModel = require('../models/TransactionModel.js');
const ItemModel = require('../models/ItemModel.js')
const CartModel = require('../models/CartModel.js')


module.exports = {

    create(req, res) {

        TransactionModel.create({
                user: req.user._id.toString(),
                items: req.body.items,
                total: req.body.total,
                status: req.body.status
            })
            .then((transaction) => {

                let checkedOutItems = req.body.items

                let itemStockUpdates = [];
                checkedOutItems.forEach((checkedOutItem) => {
                    let updatePromise = ItemModel.findByIdAndUpdate(checkedOutItem._id, {
                        "$set": {
                            stock: checkedOutItem.stock - checkedOutItem.quantity
                        }
                    })
                    itemStockUpdates.push(updatePromise);
                });

                Promise.all(itemStockUpdates)
                    .then(results => {
                        return CartModel.create({
                            customer : req.user._id,
                            cartItems : [],
                        })
                    })
                    .then((result) => {
                        return CartModel.findByIdAndUpdate(req.body.cartId, {
                            "$set": {
                                status: 'checkedOut'
                            }
                        })
                    })
                    .then((cart) => {
                        res.json({
                            transaction,
                            message : 'Checkout success'
                        })
                    }).catch(err => {
                        res.status(500).json({
                            message: 'Error when creating Transaction',
                            error: err
                        })
                    })


            }).catch((err) => {
                res.status(500).json({
                    message: 'Error when creating Transaction',
                    error: err
                });
            });

    },

    show(req, res) {

        let userId = req.user._id
        let option = { user : userId }

        if(req.user.role == 'admin') option = {}

        TransactionModel.find(option).populate('user', 'name email')
        .then((transactions) => {
            res.json(transactions)
        }).catch((err) => {
            res.status(500).json({
                message : 'error when getting transactions',
                error : err
            })
        });

    },
    
    report(req, res) {

        TransactionModel.find()
        .then((transactions) => {
            let AllTransactionItems = []

            transactions.forEach(transaction => {
                transaction.items.forEach(item => {
                    AllTransactionItems.push(item)
                })
            })

            let dateGrouped = {}
            let dates = []
            AllTransactionItems.forEach(transactionItem => {
                let date = transactionItem.updatedAt.slice(0,10)
                if(dateGrouped[date] === undefined) {
                    dateGrouped[date] = [transactionItem]
                    dates.push(date)
                } else {
                    dateGrouped[date].push(transactionItem)
                }
            })

            let dateAndItemGrouped = {}
            
            dates.forEach(date => {
                dateAndItemGrouped[date] = {}
                dateGrouped[date].forEach(item => {

                    if(dateAndItemGrouped[date][item._id] === undefined) {
                        dateAndItemGrouped[date][item._id] = {
                            name : item.name,
                            quantity : item.quantity
                        }
                    } else {
                        dateAndItemGrouped[date][item._id].quantity += item.quantity
                    }
                })

            })

            res.json({
                data : dateAndItemGrouped
            })

        }).catch((err) => {
            res.status(500).json({
                message : 'error when getting transactions',
                error : err
            })
        });

    }


};