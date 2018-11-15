const Cart = require('../models/cart')

module.exports = {


  findAll: function(req,res) {

    Cart.find()
      .then((categories) => {
        res.status(200).json({
          categories
        })
      }).catch((err) => {
        res.status(500).json({
          err
        })
      });

  },

  create: function (req,res) {
    
    let newCart = new Cart({
      items : req.body.items,
      quantity : req.body.quantity,
      subTotal : req.body.subTotal
    })

    newCart.save()
      .then((cart) => {
        res.status(200).json({
          cart,
          message: 'create cart success'
        })
      }).catch((err) => {
        res.status(500).json({
          err,
          message: 'create cart failed'
        })
      });
    
  },

  update: function(req,res) {
    console.log('masuk sini lah update');
    // console.log('masuk sini', req.body);
    // console.log('masuk sini headers', req.headers);
  }

}