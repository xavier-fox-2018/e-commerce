const Cart = require('../models/cartModel.js');
const Item = require('../models/itemModel.js');
const mongoose = require('mongoose');

class CartController {
    static addItemToCart(req, res) {
        Cart.findOne({user: req.user._id})
            .then(function(cart) {
                let itemId = mongoose.Types.ObjectId(req.params.id);

                // filter itemList in cart, will return an array
                const result = cart.itemList.filter(function(data) {
                    return itemId.equals(data.item);
                });

                if (result.length === 0) { // if item is not found in cart, then push item to cart
                    Item.findById(req.params.id)
                        .then(function(item) {
                            item.stock = item.stock - 1;
                            item.sold = item.sold + 1;
                            item.save()
                                .then(function(resultUpdate) {
                                    Cart.updateOne({user: req.user._id}, {
                                        $push: {
                                            itemList: {
                                                item: item._id,
                                                qty: 1,
                                                subTotal: item.price
                                            }
                                        }
                                    })
                                        .then(function(result) {
                                            res.status(200).json({
                                                result: result,
                                                message: `${item.name} successfully added to your cart`
                                            });
                                        })
                                        .catch(function(err) {
                                            console.log('Update Push Item To Cart Error: ', err);
                                            res.status(500).json(err);
                                        });
                                })
                                .catch(function(err) {
                                    console.log('Update Decreased Item Stock Error: ', err);
                                    res.status(500).json(err);
                                });
                        })
                        .catch(function(err) {
                            console.log('Find Item While In Process To Add Item To Cart Error: ', err);
                            res.status(500).json(err);
                        });
                } else if (result.length === 1) { // if item is already in cart, then update the quantity and subTotal
                    Item.findById(result[0].item)
                        .then(function(item) {
                            item.stock = item.stock - 1;
                            item.sold = item.sold + 1;
                            item.save()
                                .then(function(resultUpdate) {
                                    Cart.update({
                                        'user': req.user._id,
                                        'itemList.item': item._id
                                    }, {
                                        '$set': {
                                            'itemList.$.qty': result[0].qty + 1,
                                            'itemList.$.subTotal': result[0].subTotal + item.price
                                        }
                                    })
                                        .then(function(result) {
                                            res.status(200).json({
                                                result: result,
                                                message: `${item.name} quantity in your cart has been increased`
                                            });
                                        })
                                        .catch(function(err) {
                                            console.log('Update Increase Item Qty In Cart Error: ', err);
                                            res.status(500).json(err);
                                        });
                                })
                                .catch(function(err) {
                                    console.log('Update Decreased Item Stock Error: ', err);
                                    res.status(500).json(err);
                                });
                        })
                        .catch(function(err) {
                            console.log('Find Item While In Process To Increase Item Qty And Subtotal In Cart Error: ', err);
                            res.status(500).json(err);
                        });
                }
            })
            .catch(function(err) {
                console.log('Find Cart While Adding Item Error: ', err);
                res.status(500).json(err);
            });
    }

    static getCart(req, res) {
        Cart.findOne({user: req.user._id}).populate('itemList.item')
            .then(function(cart) {
                res.status(200).json(cart);
            })
            .catch(function(err) {
                console.log('Find Cart While Getting Cart Error: ', err);
                res.status(500).json(err);
            });
    }

    static removeItemFromCart(req, res) {
        Cart.findOne({user: req.user._id})
            .then(function(cart) {
                let itemId = mongoose.Types.ObjectId(req.params.id);

                const result = cart.itemList.filter(function(data) {
                    return itemId.equals(data.item);
                });

                if (result[0].qty > 1) { // if item qty is bigger than 1, then substract item qty in cart and add it's stock by 1
                    Item.findById(itemId)
                        .then(function(item) {
                            item.stock = item.stock + 1;
                            item.sold = item.sold - 1;
                            item.save()
                                .then(function(resultUpdate) {
                                    Cart.update({
                                        'user': req.user._id,
                                        'itemList.item': itemId
                                    }, {
                                        '$set': {
                                            'itemList.$.qty': result[0].qty - 1,
                                            'itemList.$.subTotal': result[0].subTotal - item.price
                                        }
                                    })
                                        .then(function(resultUpdate) {
                                            res.status(200).json({
                                                result: resultUpdate,
                                                message: `${item.name} quantity in your cart has been decreased`
                                            });
                                        })
                                        .catch(function(err) {
                                            console.log('Update Decrease Item Qty In Cart Error: ', err);
                                            res.status(500).json(err);
                                        });
                                })
                                .catch(function(err) {
                                    console.log('Update Increased Item Stock Error: ', err);
                                    res.status(500).json(err);
                                });
                        })
                        .catch(function(err) {
                            console.log('Find Item While In Process To Decrease Item Qty And Subtotal In Cart Error: ', err);
                            res.status(500).json(err);
                        });
                } else if (result[0].qty === 1) { // if item qty is exactly 1, then simply remove item from itemList array in cart
                    Cart.updateOne({user: req.user._id}, {
                        "$pull": {"itemList": {"item": itemId}}
                    }, {safe: true, multi: true})
                        .then(function(result) {
                            Item.findById(itemId)
                                .then(function(item) {
                                    item.stock = item.stock + 1;
                                    item.sold = item.sold - 1;
                                    item.save()
                                        .then(function(resultUpdate) {
                                            res.status(200).json({
                                                result: resultUpdate,
                                                message: `Successfully remove ${item.name} from your cart`
                                            });
                                        })
                                        .catch(function(err) {
                                            console.log('Update Pull Item From Cart Error: ', err);
                                            res.status(500).json(err);
                                        });
                                })
                                .catch(function(err) {
                                    console.log('Update Increased Item Stock Error: ', err);
                                    res.status(500).json(err);
                                });
                        })
                        .catch(function(err) {
                            console.log('Find Item While In Process To Remove Item From Cart Error: ', err);
                            res.status(500).json(err);
                        });
                }
            })
            .catch(function(err) {
                console.log('Find Cart While Removing Item Error: ', err);
                res.status(500).json(err);
            });
    }

    static emptyCart(req, res) {
        Cart.updateOne({user: req.user._id}, {
            "$set": {
                "itemList": []
            }
        }, {safe: true, multi: true})
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                console.log('Empty Cart Error: ', err);
                res.status(500).json(err);
            });
    }

    static getTotalPrice(req, res) {
        Cart.findOne({user: req.user._id})
            .then(function(cart) {
                let totalPrice = 0;

                for (let i = 0; i < cart.itemList.length; i++) {
                    totalPrice += cart.itemList[i].subTotal;
                }

                res.status(200).json({
                    totalPrice: totalPrice
                });
            })
            .catch(function(err) {
                console.log('Get Total Price In Cart Error: ', err);
                res.status(500).json(err);
            });
    }
}

module.exports = CartController;