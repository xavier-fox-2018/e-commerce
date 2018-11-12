const Category = require('../models/category')

module.exports = {


  findAll: function(req,res) {

    Category.find()
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
    
    let newCategory = new Category({
      name : req.body.name
    })

    newCategory.save()
      .then((category) => {
        res.status(200).json({
          category,
          message: 'create category success'
        })
      }).catch((err) => {
        res.status(500).json({
          err,
          message: 'create category failed'
        })
      });
    
  }

}