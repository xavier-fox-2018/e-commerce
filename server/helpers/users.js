const User = require('../models/users')

function emptyCart(user){
    User.updateOne({
        _id: user._id
    },{$set: {
        cart: []
    }})
    .then((result) => {
    }).catch((err) => {
        res.status(500).json(err)
        
    });
}


module.exports = emptyCart