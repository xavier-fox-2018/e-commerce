const Transaction = require('../models/transaction')
const Item = require('../models/items')
const User = require('../models/users')
const emptyCart = require('../helpers/users')

module.exports = {
    add: (req, res) => {   
        User.findOne({
            _id: req.decoded._id
        })
        .populate('cart.item').exec()
        .then((result) => {
            let items = []
            result.cart.forEach(item => {
                var temp = {
                    itemId: item.item._id,
                    name: item.item.name,
                    price: item.item.price,
                    qty: item.qty,
                    subTotal: item.qty * item.item.price
                }
                items.push(temp)
                
                Item.updateOne({
                    _id: item.item._id
                }, {$set: {
                    stock: item.item.stock - item.qty
                }})
                .then((result) => {
                })
            });
            Transaction.create({
                customerId: req.decoded._id,
                items: items,
                shippingName: req.body.shippingName,
                shippingAddress: req.body.shippingAddress,
                shippingCourir: req.body.shippingCourir,
                shippingCost: req.body.shippingCost,
                paymentTotal: req.body.paymentTotal,
                paymentName: req.body.paymentName,
                paymentStatus: true
            })
            .then((result2) => {
                emptyCart(req.decoded)
                res.status(201).json({message: 'add transaction success', result: result2})
            })
        }).catch((err) => {
            emptyCart(req.decoded)
            res.status(500).json(err)
        });
    },
    show: (req, res) => {  
        Transaction.findOne({
            _id: req.params.id
        })
        .populate('customerId')
        .exec()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json({message: 'error show transaction', err: err})
        });
    },
    find: (req, res) => {
        Transaction.findOne({
            _id: req.params.id
        })
        .then((result) => {
            res.status(200).json({message: 'find transaction success', result: result})
        })
        .catch((err) => {
            res.status(500).json({message: 'error find transaction', err: err})
        });
    },
    showAll: (req, res) => {
        let startDate = new Date(req.params.start)
        const end= req.params.end.split('-');
        let endDate = new Date(Date.UTC(end[0], Number(end[1])-1, end[2], 23, 59, 59))
        Transaction.find({
            createdAt: {
                "$gte": startDate, "$lt": endDate
            }
        })
        .populate('customerId')
        .exec()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    itemReport: (req, res) => {
        let start = new Date(Date.UTC(req.params.y, Number(req.params.m)-1, 1, 00,00,00))
        let end = new Date(Date.UTC(req.params.y, Number(req.params.m), 1, 00,00,00))
        Transaction.find({
            createdAt: {
                $gte: start, $lt: end
            }
        })
        .populate('items.itemId').exec()
        .then((result) => {
            let resultItems = []
            result.forEach(trx => {
                trx.items.forEach(item => {
                    let cek = true
                    resultItems.forEach(data=> {
                        if(data.id === item.itemId._id){
                            data.qty+=item.qty
                            cek = false
                        }
                    })
                    if(cek){
                        resultItems.push({id: item.itemId._id, name: item.name, qty: item.qty})
                    }
                })
            })
            res.status(200).json(resultItems)
        }).catch((err) => {
            res.status(500).json(err)            
        });
    },
    showMyTrx: (req, res) => {        
        Transaction.find({
            customerId: req.decoded._id
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    }
}