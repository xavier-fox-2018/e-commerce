const Cart = require('../models/cart.js')
const User = require('../models/user.js')
const decode = require('../helpers/decode.js')

class Controller {
    static getCart(req, res) {
        let customer_id = decode(req.body.token)._id
        Cart
            .find({
                customerId: customer_id
            })
            .populate("cart")
            .populate("customerId")
            .then((data) => {
                res.status(200).json({data:data})
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({message: err, note:'See console for details'})
            })
    }
    static addtoCart(req, res) {
        //decode to find customer ID
        let customer_id = decode(req.body.token)._id

        //find if customer exist in db
        User
            .findById({
                _id: customer_id
            })
            .then((data) => {
                //add item to customer cart
                return Cart
                        .findOne({
                            customerId: customer_id
                        })
                        .then((result) => {
                            result.cart.push(req.body.item)
                            //save the addition in DB
                            return result
                                        .save()
                                        .then((data) => {
                                            res.status(201).json({data:data,message:'Item added to cart'})
                                        })

                        })    
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({message: err, note:'See console for details'})
            })
    }
    static removefromCart(req, res) {
        //decode to find customer ID
        let customer_id = decode(req.body.token)._id
        Cart
            .findOne({
                customerId: customer_id
            })
            .then((data) => {
                console.log(data)
                let newArray = []
                //loop to exclude the items we are removing from cart
                for(let i = 0; i< data.cart.length; i++) {
                    if(data.cart[i] != req.body.item_id) {
                        newArray.push(data.cart[i])
                    }
                }
                data.cart = newArray
                return data
                        .save()
                        .then((result) => {
                            res.status(200).json({data:data, message:'Item(s) removed from cart'})
                        })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({message: err, note:'See console for details'})
            })
    }
    static checkout(req, res) {
        let customer_id = decode(req.body.token)._id
        Cart
            .findOne({
                customerId: customer_id
            })
            .then((data) => {                
                data.cart = []
                console.log(data)
                return data
                        .save()
                        .then((result) => {
                            res.status(200).json({data:data, message:'Checkout Sucessful'})
                        })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({message: err, note:'See console for details'})
            })
    }
}

module.exports = Controller