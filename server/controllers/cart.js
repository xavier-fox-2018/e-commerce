const Cart = require('../models/cart')


class Controller {
    
    
    static create(req, res) {
        console.log(req.body);
        
        const cart = new Cart({
            name: req.data._id,
            item_list: req.body.item_list,
            total: req.body.total
        })

        cart.save()
            .then(cart => {

                console.log('Berhasil tambah cart');
                res.status(201).json({
                    message: `Successfully created cart`
                })

            })
            .catch(err => {
                console.log('Gagal create cart,', err);
                res.status(500).json({
                    message: `Failed to create cart`,
                    error: err
                })
            })
    }

    static getCart(req,res) {
        Cart.findOne({
            name: req.data._id
        })  
            .populate('item_list._id')
            .then(cart => {
                console.log('Berhasil get cart');
                    res.status(201).json({
                    message: `Successfully get cart`,
                    data: cart
                })
            })
            .catch(err => {
                console.log('Gagal get cart,', err);
                res.status(500).json({
                    message: `Failed to get cart`,
                    error: err
                })
            })
    }

    static remove(req,res) {
        Cart.deleteOne({
            name: req.data._id
        })
            .then(() => {
                console.log('Berhasil remove cart');
                res.status(200).json({
                    message: `Data has been successfully deleted!`
                })
            })
            .catch(err => {
                console.log('Error saat remove cart.', err);
                res.status(500).json({
                    message: 'Error saat remove cart',
                    error: err
                })
            })
    }

    

}

module.exports = Controller