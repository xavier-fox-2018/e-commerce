//Model
const Category = require('../models/category.js')
const Item = require('../models/item.js')

class Controller {
    static viewCategory(req, res) {
        Category
            .find()
            .sort(
                {
                    name: 1
                }
            )
            .then(data => {
                res.status(200).json({data: data})
            })
            .catch(err => {
                console.log('err')
                res.status(500).json({message: err.message, note: 'Please see console log for details'})
            })
    }
    static addCategory(req, res) {
        //check if category is unique
        Category
            .findOne(
                {
                    name: req.body.name
                }
            )
            .then (data => {
                //if category found, state that it is not unique
                if(data) {
                    console.log('Category already exist')
                    res.status(400).json({message: 'Category already exist'})
                } else {
                    let newCategory = new Category ({
                        name: req.body.name
                    })
                    return newCategory
                                .save()
                                .then((data) => {
                                    res.status(201).json({message: "Category Added", data: newCategory})
                                })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: 'Please see console log for details' })
            })
    }
    static deleteCategory(req, res) {
        // check if there are items with the category
        Item
            .find({
                category: req.body._id
            })
            .then((data) => {
                //if no items has the category: delete
                if(data.length === 0) {
                    return Category
                                .deleteOne({
                                    _id: req.body._id
                                })
                                .then((data) => {
                                    res.status(200).json({message:"Category deleted", data:data})
                                })
                } else {
                    console.log('Please make sure all items with that category has been edited!')
                    res.status(400).json({message: 'Please make sure all items with that category has been edited!'})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: err.message, note: 'Please see console log for details'})
            })
    }
}

module.exports = Controller