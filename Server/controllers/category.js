const Category = require('../models/category')

module.exports = {


  findAll: function(req,res) {

    Category.find()
      .then((categories) => {
        let count = 0;
        let result = [];
        categories.forEach(category => {
          if ( count < 5 ) {
            result.push(category)
          }
          count++
        })
        res.status(200).json({
          result,
          message: `All selected categories found`
        })
      }).catch((err) => {
        res.status(500).json({
          err,
          message: `Server can't show categories`
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