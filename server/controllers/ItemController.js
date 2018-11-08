const Item = require('../models/Item')

class ItemController {
    static create(req,res){
        Item.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            img: req.body.img,
            category: req.body.category
        })
        .then(item=>{
            res.status(200).json({
                item: item,
                message: "succesfully create new item"
            })
        })
        .catch(err=>{
            res.status(500).json({
                err: err.message
            })
        })
    }

    static index(req,res){
        Item.find()
        .then(items=>{
            res.status(200).json({
                items:items
            })
        })
        .catch(err=>{
            res.status(500).json({
                error: err.message,
                message: "error fetching items data"
            })
        })
    }

    static show(req,res){
        Item.findOne({
            _id: req.params.id
        })
            .then(item=>{
                res.status(200).json({
                    item: item
                })
            })
            .catch(err=>{
                res.status(200).json({
                    err: err.message,
                    message: "error fetching data item"
                })
            })
    }

    static update(req,res){
        Item.update({
            _id: req.params.id
        }, req.body)
            .then(success=>{
                res.status(200).json({
                    message: success
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message: err.message
                })
            })
    }

    static delete(req,res){
        Item.deleteOne({
            _id: req.params.id
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

module.exports = ItemController