const item = require('../models/item.js')

class Item {
  static create (req,res) {
    item.create({
      name : req.body.name,
      stock : req.body.stock,
      price : req.body.price,
      ratings : [],
      reviews : []
    })
    .then( item => res.status(200).json({
      msg:'successfully created new item.',
      data:item
      })
    )
    .catch( err => res.status(500).err(err))
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
    item.find()
    .then( items => {
      res.status(200).json(items);
    })
    .catch (err => res.status(500).json(err))
  }

  static getOne (req,res) {
    item.findOne({
      _id: req.body.id
    })
    .then( data => res.status(200).json(data))
    .catch (err => res.status(500).json(err))
  }
  
  static delete (req,res) {
    item.findOneAndDelete({
      _id: req.body.id
    })
    .then( data => res.status(200).json(data))
    .catch (err => res.status(500).json(err))
  }
}

module.exports = Item;

