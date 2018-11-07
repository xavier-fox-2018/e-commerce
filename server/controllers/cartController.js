const Cart = require('../models/cartModel')

class Controller {

    static read(req,res){
        Cart.findOne({
            user : req.userId
        })
        .then((userShoppingCart)=>{
            if(!userShoppingCart){
                Cart.create({
                    user : req.userId
                })
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
        Cart.findOne({
            user : req.userId
        })
        .then((userShoppingCart)=>{
            
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Error Add to Cart",
                error : err
            })
        })
    }

    static removeFromCart(req,res){

    }
}

module.exports = Controller