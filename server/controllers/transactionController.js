const Transaction = require('../models/transactionModel')
const Cart = require('../models/cartModel')

class Controller {
    static create(req,res){
        console.log('req userid',req.userId)
        console.log('req body',req.body)

        let transaction = {
            user : req.userId,
            item_list : req.body.item_list,
            total_price : req.body.total_price
        }

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
                    message : "Error in Emptying Cart After Checkout"
                })
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Error In Creating Transaction"
            })
        })
    }

    static read(req,res){
        
    }

}

module.exports = Controller;