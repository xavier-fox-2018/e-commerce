const CartModel = require('../models/CartModel.js');

module.exports = {

    list(req, res) {

        CartModel.find()
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.status(500).json({
                message: 'Error when getting Carts.',
                error: err
            });
        });

    },

    getCartByUserId(req, res) {

        CartModel.findOne({
            customer : req.params.userId,
            status : 'active'
        })
        .then((Cart) => {
            if (!Cart) {
                return res.status(404).json({
                    message: 'No such Cart'
                });
            } else {
                res.json(Cart);
            }
        }).catch((err) => {
            res.status(500).json({
                message: 'Error when getting Cart.',
                error: err
            });
        });

    },

    show(req, res) {
        
        const id = req.params.id;        
        CartModel.findById(id)
        .then((Cart) => {
            if (!Cart) {
                return res.status(404).json({
                    message: 'No such Cart'
                });
            } else {
                res.json(Cart);
            }
        }).catch((err) => {
            res.status(500).json({
                message: 'Error when getting Cart.',
                error: err
            });
        });

    },

    create(req, res) {

        CartModel.create({
            customer : req.body.customer,
			cartItems : req.body.cartItems,
			total : req.body.total,
			status : req.body.status
        })
        .then((Cart) => {
            res.status(201).json(Cart);
        }).catch((err) => {
            res.status(500).json({
                message: 'Error when creating Cart',
                error: err
            });
        });

    },

    update(req, res) {

        CartModel.findById(req.params.id)
        .then((Cart) => {
            if (!Cart) {
                return res.status(404).json({
                    message: 'No such Cart'
                });
            }
            
            Cart.cartItems = req.body.cartItems || Cart.cartItems 
            Cart.total = req.body.total !== null ? req.body.total : Cart.total  
            Cart.status = req.body.status || Cart.status

            return Cart.save()

        })
        .then((Cart) => {
            res.json(Cart)
        }).catch((err) => {
            res.status(500).json({
                message: 'Error when updating Cart',
                error: err
            });
        });

    }

    
};
