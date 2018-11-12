const Cart = require('../models/cart')
const Transaction = require('../models/transaction')
class TransactionController {

    static getAll(req, res) {
        Transaction.find({
            user: req.user._id
        }).populate('products.productId')
        .then(transaction => {
            console.log(transaction[0].products)
            res.status(200).json(transaction)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static create(req, res) {
        Cart.findOne({
            user: req.user._id
        })
        .then(cart => {            
            let total = 0;
            cart.products.forEach(element => {
                total += (element.price * element.qty)
            });
            
            Transaction.create({
                user: cart.user,
                products: cart.products,
                total: total
            })
            .then(transaction => {
                cart.updateOne({
                    "$set": {
                        "products": []
                    }
                }, {safe: true, multi: true})
                    .then(result => {
                        res.status(200).json(transaction);
                    })
                    .catch(err => {
                        console.log('empty cart: ', err);
                        res.status(500).json(err);
                    });
                })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TransactionController