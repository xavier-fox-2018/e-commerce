const Transaction = require('../models/transaction')


module.exports = {
    add: (req, res) => {        
        Transaction.create({
            customerId: req.decoded.id,
            items: req.body.items,
            total: req.body.total
        })
        .then((result) => {
            res.status(201).json({message: 'add transaction success', result: result})
        }).catch((err) => {
            res.status(500).json({message: 'error add transaction', err: err})
        });
    },
    show: (req, res) => {
        Transaction.find({
            customerId: req.params.id
        })
        .then((result) => {
            res.status(200).json({message: 'show transaction success', result: result})
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
    }


}