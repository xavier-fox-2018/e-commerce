const Category = require('../models/categoryModel')

class Controller {
    static create(req,res){
        Category.create({
            name : req.body.name
        })
        .then((new_category)=>{
            res.status(201).json({
                message : "Create Category Success",
                created : new_category
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Create Category Error",
                error : err
            })
        })
    }

    static read(req,res){
        Category.find({})
        .then((categories)=>{
            res.status(200).json(categories)
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Read Categories Error",
                error : err
            })
        })
    }
}

module.exports = Controller;