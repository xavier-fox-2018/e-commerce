const item = require('../models/item.js')

class Item {
  static create (req,res) {
    item.create({
      name : req.body.name,
      stock : req.body.stock,
      price : req.body.price,
      ratings : [],
      reviews : [],
      createdBy:res.locals.token._id
    })
    .then( item => res.status(200).json({
        msg:'successfully created new item.',
        data:item
      })
    )
    .catch( err => console.log(err))
  }

  static update (req,res) {
    item.findByIdAndUpdate( req.body.id,{
      name: req.body.taskName,
      stock: req.body.description,
      price: req.body.due,
      ratings: req.body.priority,
      reviews: req.body.groupId || null,
    } , 
    {
      new:true
    }
    )
    .then( data => {
      res.status(200).json(data);
    })
    .catch (err => res.status(500).json(err))
  }
  
  static getAll (req,res) {
    let adminId=res.locals.token._id;
    item.find()
    .then(items => {
      res.status(200).json({
        items:items,
        adminId:adminId
      });
    })
    .catch (err => {
      res.status(500).json(err)
    })
  }

  static getOne (req,res) {
    item.findOne({
      _id: req.params.id
    })
    .then( data => res.status(200).json(data))
    .catch (err => res.status(500).json(err))
  }
  
  static deleteOne (req,res) {
    item.findOneAndDelete({
      _id: req.params.id,
    })
    .then( data => res.status(200).json(data))
    .catch (err => res.status(500).json(err))
  }
}

module.exports = Item;

