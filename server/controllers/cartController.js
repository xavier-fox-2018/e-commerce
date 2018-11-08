const mongoose = require('mongoose')
const Cart = require('../models/cartModel')
const Item = require('../models/itemModel')

class Controller {

    static read(req,res){
        Cart.findOne({
            user : req.userId
        })
        .populate('item_list.item')
        .then((userShoppingCart)=>{
            if(!userShoppingCart){
                Cart.create({
                    user : req.userId
                })
                .populate('item_list.item')
                .then((created)=>{
                    res.status(200).json(created)
                })
                .catch((err)=>{
                    res.status(500).json({
                        message : "Error In Creating New User Cart"
                    })
                })
            }else{
                res.status(200).json(userShoppingCart)
            }
        })
        .catch((err)=>{
            res.status(500).json({
                error : err,
                message : "Read User Cart Error"
            })
        })
    }

    static addToCart(req,res){
        let input_item = req.body
        let userId = req.userId

        Cart.findOne({
            user : req.userId
        })
        .then((cart)=>{
            let in_cart = cart.item_list

            let filtered = in_cart.filter(function(el){
                return el.item.toString() === input_item._id.toString()
            })

            if(filtered.length === 0){
                Cart.findOneAndUpdate({
                    user : userId
                },{
                    $push : {
                        item_list : {
                            item : input_item._id,
                            qty : 1,
                            sub_total : input_item.price
                        }
                    }
                })
                .then((done)=>{
                    Item.findById(input_item._id)
                    .then((item)=>{
                        item.stock = item.stock - 1
                        item.save()
                        .then((done)=>{
                            res.status(200).json({
                                message : `${input_item.name} added to your carts`
                            })
                        })
                        .catch((err)=>{
                            res.status(500).json({
                                message : 'Error In Reducing Item Stock'
                            })
                        })
                    })    
                })
                .catch((err)=>{
                    console.log(err)
                })
            }else{
                Item.findById(input_item._id)
                .then((resultItem)=>{
                    resultItem.stock = resultItem.stock - 1
                    resultItem.save()
                    .then((done)=>{
                        Cart.updateOne({
                            'user': req.userId,
                            'item_list': { $elemMatch : { item : resultItem._id } }
                        },{
                            '$set' : {
                                'item_list.$.qty' : filtered[0].qty + 1,
                                'item_list.$.sub_total' : filtered[0].sub_total + resultItem.price
                            }
                        })
                        .then((done)=>{
                            res.status(200).json({
                                message : `${resultItem.name} added to your carts`
                            })
                        })
                        .catch((err)=>{
                            res.status(500).json({
                                message : 'Add To Cart Error'
                            })
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        })
        .catch((err)=>{
            res.status(500).json(err)
        })

    }

    static removeFromCart(req,res){

        if(req.body.qty > 1){
            Item.findById(req.body.item)
                .then((resultItem)=>{
                    resultItem.stock = resultItem.stock + 1
                    resultItem.save()
                    .then((done)=>{
                        Cart.updateOne({
                            'user': req.userId,
                            'item_list': { $elemMatch : { item : resultItem._id } }
                        },{
                            '$set' : {
                                'item_list.$.qty' : req.body.qty - 1,
                                'item_list.$.sub_total' : req.body.sub_total - resultItem.price
                            }
                        })
                        .then((done)=>{
                            res.status(200).json({
                                message : `Reduce ${resultItem.name} Quantity In Your Cart`
                            })
                        })
                        .catch((err)=>{
                            res.status(500).json({
                                message : 'Add To Cart Error'
                            })
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                })
                .catch((err)=>{
                    console.log(err)
                })


        }else if(req.body.qty <= 1){
            
            Cart.findOneAndUpdate({
                user : req.userId
            },{
                $pull : {
                    item_list : {
                        item : req.body.item._id
                    }
                }
            })
            .then((cart)=>{
                Item.findById(req.body.item._id)
                .then((resultItem)=>{
                    resultItem.stock = resultItem.stock + 1
                    resultItem.save()
                    
                    res.status(200).json({
                        message : "Item Removed From Carts"
                    })
                })
                .catch((err)=>{
                    res.status(500).json({
                        message : 'Error In Adding Item Stock'
                    })
                })  
            })
            .catch((err)=>{
                res.status(500).json({
                    message : "Error In Getting User Carts Data"
                })
            })
        }
    }
}

module.exports = Controller