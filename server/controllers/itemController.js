const Item = require('../models/item.js');
const helper = require('../helper/helper.js')

class ItemController {

  static create(req, res) {
    Item
      .create({
        name : req.body.name,
        description : req.body.description,
        price : Number(req.body.price),
        stock : Number(req.body.stock),
        category : req.body.category
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static delete(req, res) {
    Item
      .deleteOne({
        _id : req.params.id 
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static update(req, res) {
    Item
      .findById(req.params.id)
      .then(item => {
        item.name = req.body.name;
        item.description = req.body.description;
        item.price = Number(req.body.price);
        item.stock = Number(req.body.stock);
        item.category = req.body.category;
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static show(req, res) {
    Item
      .find({})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  
}

module.exports = ItemController