const stockModels = require('../models/stock')
class Stock{

    static viewAll(req,res){
        stockModels.find({})
        .then(data=>{
            res.send(data)
        })
    }
    static addItem(req,res){
        stockModels.find({
            category: req.body.category,
            name: req.body.name
        })
        .then(data=>{
            if(data.length < 1){
                stockModels.create({
                    category: req.body.category,
                    name: req.body.name,
                    price: req.body.price,
                    stock: req.body.stock,
                    image: req.body.image
                })
                .then((data)=>{
                    res.status(200).json({
                        message: "successfully added",
                        data: data
                    })
                })
                .catch(err=>{
                    res.status(500).json({
                        message: err
                    })
                })
            }else{
                res.status(409).json({
                    message: "data sudah ada"
                })
            }
        })
        .catch(err => res.status(500).json(err))
    }
    static byCategory(req,res){
        stockModels.find({
            category: req.params.category
        })
        .then(data => res.send(data))

    }
    static update(req,res){
        stockModels.findByIdAndUpdate(
            req.params.id
            ,{
            category: req.body.category,
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            image: req.body.image
            },
            {new : true}
        )
        .then((data)=>{
            res.status(200).json({
                message: 'success update data'
            })
        })
        .catch(err=>{
            res.status(500).json({
                message : err
            })
        })
    }
    static remove(req,res){
        stockModels.findByIdAndRemove(req.params.id)
        .then(data=>{
            res.status(200).json({
                message: 'succesfully remove '
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:err
            })
        })
    }
}

module.exports = Stock