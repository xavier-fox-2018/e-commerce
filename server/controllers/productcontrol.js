require('dotenv').config()
const Product = require('../models/product')
const Category = require('../models/category')
const {Storage} = require('@google-cloud/storage')
const crypto = require('crypto')
const path = require('path')
const googleCloudStorage = new Storage({
  projectId: process.env.GCLOUD_STORAGE_BUCKET,
  keyFilename: process.env.GCLOUD_KEY_FILE
});
const bucket = googleCloudStorage.bucket('cv-generator');

class ProductController {
  static addProduct(req, res, next) {
    const newFileName = crypto.randomBytes(16).toString('hex') + path.extname(req.file.originalname)
    const blob = bucket.file(newFileName);
  
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });
  
    blobStream.on("error", err => {
      next(err);
      return;
    });
  
    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  
      // Make the image public to the web (since we'll be displaying it in browser)
      blob.makePublic().then(() => {
        Product.create({
          name: req.body.name,
          description: req.body.description,
          stock: Number(req.body.stock),
          price: Number(req.body.price),
          categoryId: req.body.category,
          img: publicUrl
        })
          .then(data => {
            res.status(201).json({
              result: data,
              error: null
            })
          })
          .catch(error => {
            res.status(400).json({
              result: null,
              error: error
            })
          })
      });
    });
    blobStream.end(req.file.buffer);
  }
  static getProduct(req, res, next) {
    Product.find().populate('categoryId')
      .then(data => {
        res.status(200).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(200).json({
          result: null,
          error: error
        })
      })
  }

  static editProduct (req, res, next) {
    if(req.file) {
      Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        stock: Number(req.body.stock),
        price: Number(req.body.price),
        categoryId: req.body.category,
        img: `http://localhost:3000/${req.file.filename}`
      })
      .then(data => {
        res.status(200).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: error
        })
      })
    }else{
      Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        stock: Number(req.body.stock),
        price: Number(req.body.price),
        categoryId: req.body.category,
      })
      .then(data => {
        res.status(200).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: error
        })
      })
    }

    
  }

  static deleteProduct(req, res, next) {
    Product.findByIdAndDelete(req.params.id)
    .then(data => {
      res.status(200).json({
        result: data,
        error: null
      })
    })
    .catch(error => {
      res.status(500).json({
        result: null,
        error: error
      })
    })
  }

  static addCategory(req, res, next) {
    Category.create({
      name: req.body.name,
      products: []
    })
      .then(data => {
        res.status(201).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(400).json({
          result: null,
          error: error
        })
      })
  }

  static getCategory(req, res, next) {
    Category.find()
    .then(data => {
      res.status(200).json({
        result: data,
        error: null
      })
    })
    .catch(error => {
      res.status(400).json({
        result: null,
        error: error
      })
    })
  }
}

module.exports = ProductController