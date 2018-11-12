const Item = require('../models/itemModel')

class Controller {
    static create(req,res){
        Item.create({
            name :req.body.name,
            image_url : req.body.image_url,
            category : req.body.category,
            description : req.body.description,
            price : req.body.price
        })
        .then((item)=>{
            res.status(201).json({
                message : "Create Item Success",
                created : item
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Create Item Error",
                error : err
            })
        })
    }

    static read(req,res){
        Item.find({})
        .populate('category')
        .then((itemList)=>{
            res.status(200).json(itemList)
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Get Item List Error",
                error : err
            })
        })
    }

    static readOne(req,res){
        Item.findOne({
            _id : req.params.id
        })
        .populate('category')
        .then((item)=>{
            res.status(200).json(item)
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Read Item Error",
                error : err
            })
        })
    }

    static readByCategory(req,res){
        Item.find({
            category : req.params.id
        })
        .populate('category')
        .then((itemList)=>{
            res.status(200).json(itemList)
        })
        .catch((err)=>{
            res.status(500).json({
                error : err,
                message : 'Read By Category Error'
            })
        })
    }

    static update(req,res){
        Item.findOneAndUpdate({
            _id : req.params.id
        },{
            name : req.body.name,
            image_url : req.body.image_url,
            category : req.body.category,
            description : req.body.description,
            price : req.body.price
        })
        .then((updatedItem)=>{

            res.status(200).json({
                message : "Update Item Success",
                updated : updatedItem
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Update Item Error",
                error : err
            })
        })
    }
    
    static delete(req,res){
        Item.findByIdAndRemove({
            _id : req.params.id
        })
        .then(()=>{
            res.status(200).json({
                message : "Delete Success"
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Delete Failed"
            })
        })
    }

    static changeToDeleted(req,res){
        Item.findOneAndUpdate({
            _id : req.params.id
        },{
            deleted : true
        })
        .then((done)=>{
            res.status(200).json({
                message : "Item Status Change To Deleted"
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Error Changing Item Status To Deleted",
                error : err
            })
        })
    }
}

module.exports  = Controller