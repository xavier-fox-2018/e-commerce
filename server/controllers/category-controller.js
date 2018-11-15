const Category = require('../models/category')

module.exports = {
    addCategory: (req, res) =>{
        Category.create({
            name: req.body.name
        })
        .then(result =>{
            res.status(201).json({Category: result})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
    },

    getAll: (req, res) =>{
        Category.find({})
        .sort([['name', 'ascending']])
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
    },

    updateOne: (req, res) =>{
        Category.findOneAndUpdate({
            _id: req.params.id
        },{ name: req.body.name})
        .then(result =>{
            res.status(200).json({result})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
    },

    deleteOne: (req, res) =>{
        Category.findByIdAndRemove({_id: req.params.id })
        .then(result =>{
            res.status(200).json({result})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
    },

}