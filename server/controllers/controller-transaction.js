const ObjectId = require('mongoose').Types.ObjectId
const User = require('../models/user.js')
const Transaction = require('../models/transaction')

module.exports = {
    create : (req, res) => {

        let user_id = req._id
        let cart_id = ObjectId(req.params.id)

        User
            .findById( user_id )
            .then( user => {
                console.log(' user :', user)
                let cartSelected = user.carts.find( cart => {
                    return cart._id.equals( cart_id)
                })

                if ( cartSelected ){
                    console.log('cart selected :', cartSelected)
                    user.carts.pull(cartSelected._id)

                    let transaction = new Transaction({ member : user_id, item : cartSelected })
                    return Promise.all([user.save(), transaction.save()])
                }else {
                    res.status(500).json({ message : 'Error create checkout', error: error.message})   
                }
            })
            .then( response_transaction => {
                res.status(200).json( response_transaction )
            })  
            .catch( error => {
                res.status(500).json({ message : 'Error create checkout', error: error.message})   
            })
    },
    read : (req, res) => {
        let user_id = req._id

        Transaction
            .find({ member : user_id })
            .populate('item._id')
            .then( transactions => {
                res.status(200).json( transactions )
            })
            .catch( error => {
                res.status(500).json({ message : error.message})
            })
    }  
}