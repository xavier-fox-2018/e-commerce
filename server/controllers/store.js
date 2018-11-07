const Item = require('../models/item')
const Category = require('../models/category')

class StoreController {
  static getItems (req, res) {
    Item.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static addItem (req, res) {
    let item = new Item({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category
    })

    item.save()
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }


  static getCategories (req, res) {
    Category.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static searchByCategory (req, res) {
    Item.find()
      .then(data => {
        let arr = []
        data.forEach(element => {
          element.category.forEach(id => {
            if (id == req.params.categoryId) {
              arr.push(element)
            }
          })
        })
        res.status(200).json(arr)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = StoreController
