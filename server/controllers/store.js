const Item = require('../models/item')
const Category = require('../models/category')
require('dotenv').config()
const { Storage } = require('@google-cloud/storage')
const crypto = require('crypto')
const path = require('path')
const googleCloudStorage = new Storage({
  projectId: process.env.GCLOUD_STORAGE_BUCKET,
  keyFilename: process.env.GCLOUD_KEY_FILE
})
const bucket = googleCloudStorage.bucket('client.pemmz-palzu.site')

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

  static updateItem (req, res) {
    Item.updateOne({ _id: req.params.id }, {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      image: req.body.image,
      $set: { category: req.body.category }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteItem(req, res) {
    Item.deleteOne({ _id: req.params.id })
      .then(data => {
        res.status(200).json(data)
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

  static updateStock (req, res) {
    Item.findByIdAndUpdate(req.params.id, req.body)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static addCategory (req, res) {
    let category = new Category({
      name: req.body.name
    })

    category.save()
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteCategory (req, res) {
    Category.findByIdAndDelete(req.params.categoryId)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static uploadImage (req, res, next) {
    const newFileName = crypto.randomBytes(16).toString('hex') + path.extname(req.file.originalname)
    const blob = bucket.file(newFileName)

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    })

    blobStream.on("error", err => {
      next(err)
      return
    })

    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      // Make the image public to the web (since we'll be displaying it in browser)
      blob.makePublic().then(() => {
        res.status(200).json({
          url: publicUrl
        })
      })
    })

    blobStream.end(req.file.buffer)
  }
}

module.exports = StoreController
