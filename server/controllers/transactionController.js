const Transaction = require('../models/transactionModel')
const Cart = require('../models/cartModel')

class Controller {
    static create(req,res){

        Transaction.create({
            user : req.userId,
            item_list : req.body.item_list,
            total_price : req.body.total_price
        })
        .then((created)=>{
            console.log('masuk created',created)
            Cart.findOneAndUpdate({
                user : req.userId
            },{
                $set : {
                    item_list : []
                }
            })
            .then((cart)=>{
                res.status(200).json(created)
            })
            .catch((err)=>{
                res.status(500).json({
                    error : err,
                    message : "Error in Emptying Cart After Checkout"
                })
            })
        })
        .catch((err)=>{
            res.status(500).json({
                error : err,
                message : "Error In Creating Transaction"
            })
        })
    }

    static read(req,res){
        Transaction.find({
            user : req.userId
        })
        .populate('item_list.item')
        .then((transaction)=>{
            res.status(200).json(transaction)
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Error In Reading User Transactions",
                error : err
            })
        })
    }

}

module.exports = Controller;