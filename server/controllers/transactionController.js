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

    static mytransaction(req,res){
        Transaction.find({
            user : req.userId
        })
        .populate('item_list.item')
        .then((transactions)=>{
            res.status(200).json(transactions)
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Error In Reading User Transactions",
                error : err
            })
        })
    }

    static read(req,res){
        Transaction.find({})
        .populate('item_list.item')
        .populate('user')
        .then((transactions)=>{
            res.status(200).json(transactions)
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Error In Reading User Transactions",
                error : err
            })
        })
    }

    static readOne(req,res){
        Transaction.findOne({
            _id : req.params.id
        })
        .populate('item_list.item')
        .populate('user')
        .then((transaction)=>{
            res.status(200).json(transaction)
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Error Retrieving Transaction Detail",
                error : err
            })
        })
    }

}

module.exports = Controller;