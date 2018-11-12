const ProductModel = require('../models/product')
const CategoryModel = require('../models/category')
// const ObjectId = require('mongoose').Types.ObjectId

class User {
    static login(req, res){
        res.send('Hello')
    }

    static all(req, res){
        console.log('masuk');
       ProductModel.find({})
        .then(function(data){
            console.log(data);
            
            res.status(200).json({
                data : data
            })
        })
        .catch(function(err){
            res.status(500).json({
                message : 'Gagal'
            })
        })
    }
    
    static addProduct(req, res){
        let name = req.body.productName
        let description = req.body.description
        let stock = Number(req.body.stock)
        let price = Number(req.body.price)
        let category = req.body.category
        
        let product = new ProductModel( { name, description, stock, price, category} )
        
        product.save()
         .then(function(data){
             console.log(data)
             res.status(200).json({
                 message : data
             })
         })
         .catch(function(err){
             res.status(500).json({
                 message : 'Save data product failed'
             })
         })
    }

    static edit(req, res ){
        ProductModel.findByIdAndUpdate({
            _id : req.params.id
        })
         .then(function(data){
             res.status(200).json({
                 message : data
             })
         })
          .catch(function(err){
              res.status(500).json({
                  message : err
              })
          })
    }

    static delete(req, res){
        console.log(req.params._id)
        ProductModel.deleteOne({_id : req.params._id})
         
         .then(function(){
            res.status(200).json({
                message: 'Success'
            })
         })
         .catch((err)=>{
            res.status(500).json({
                message: 'Failed'
            })
         })
    }

    static addCategory(req, res){
        let category = new CategoryModel({
            name : req.body.name
        })
        category.save()
         .then(function(data){
            res.send(data)
         })
         .catch(function(err){
             res.status(500).json({
                 message : 'Save data product failed'
             })
         })
    }   
}

module.exports = User