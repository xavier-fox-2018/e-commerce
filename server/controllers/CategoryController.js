const Category = require('../models/Category')


class CategoryController{
    static index(req,res){
        Category.find()
            .then(categories=>{
                res.status(200).json({
                    categories: categories
                })
            })
            .catch(err=>{
                res.status(500).json({
                    err : err.message,
                    message: "error getching categories data"
                })
            })
    }

    static create(req,res){
        Category.findOne({
            name: req.body.name
        })
        .then(category=>{
            if(category){
                res.status(401).json({
                    message: "Category is already exist",
                    category: null
                })
            } else {
                Category.create({
                    name: req.body.name
                })
                    .then(category=>{
                        res.status(200).json({
                            message: "succes create category",
                            category: category
                        })
                    })
                    .catch(err=>{
                        res.status(500).json({
                            error: err.message,
                            message: "error creating category"
                        })
                    })
            }
        })
        .catch(err=>{
            res.json(500).json({
                message: "Internal server error",
                error: err.message
            })
        })
    }

    static update(req,res){
        Category.update({
            _id : req.params.id
        }, {
            name: req.body.name,
            $push: {items: req.body.items}
        })
            .then(success=>{
                res.status(200).json({
                    message: success
                })
            })  
            .catch(err=>{
                res.status(500).json({
                    message: "error updating data",
                    error : err.message
                })
            })
    }

    static show(req,res){
        Category.find({
            name: req.params.name
        })  
            .populate('items')
            .then(categories=>{
                res.status(200).json({
                    categories: categories
                })
            })
            .catch(err=>{
                res.status(500).json({
                    err: err.message
                })
            })
    }

    static delete(req,res){
        Category.deleteOne({
            _id : req.params.id
        })
            .then(success=>{
                res.status(200).json({
                    message: success
                })
            })
            .catch(err=>{
                res.status(500).json({
                err: err.message 
                })
            })
    }

}

module.exports = CategoryController