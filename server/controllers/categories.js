const Category = require('../models/categories')


module.exports = {
    add: function(req, res){      
        Category.create({
            name: req.body.name 
        })
        .then((result) => {
            res.status(201).json({message: "Category added", data: result})
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    show: function(req, res){
        Category.find()
        .then((result) => {            
            res.status(200).json(result)
            IsDeleted: false
        }).catch((err) => {            
            res.status(500).json(err)
        });
    },
    edit: function(req, res){
        Category.update({
            _id: req.params.id
        }, {
            name: req.body.name
        })
        .then((result) => {
            res.status(200).json({message: "Category Updated", data: result})
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    remove: function(req, res){
        Category.deleteOne({
            _id: req.params.id
        })
        .then((result) => {
            res.status(200).json({message: "Category Deleted", data: result})
        }).catch((err) => {
            res.status(500).json(err)
        });
    }
}