const Item = require('../models/item.js')
const Category = require('../models/category.js')

// const checkFileType = require('../helpers/checkFileType.js')
// //multer
// const multer  = require('multer')
// const path = require('path')

// //storage engine
// const storage = multer.diskStorage({
//   destination: './upload',
//   limits: {
//     fileSize: 5 * 1024 * 1024 // no larger than 5mb
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//   }
// })

// //initi upload
// const upload = multer({
//   storage: storage,
//   fileFilter: function(req, file, cb) {
//     checkFileType(file, cb)
//   }
// }).single('image_upload')

class Controller {
    static getItems(req, res) {
        Item
        .find()
        .sort(
            {
                name: 1
            }
        )
        .populate("category")
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err.message, note: 'Please see console log for details'})
        })
    }
    static addItem(req, res) {
        //check if category inputted exist
        Category
            .findById(req.body.category)
            .then((data) => {
                //if found
                if(data) {
                    let newItem = new Item ({
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    stock: req.body.stock,
                    category: req.body.category,
                    image: req.body.image
                    })
                    return newItem
                            .save()
                            .then((data) => {
                                res.status(201).json({message: 'Item succesfully added', data:newItem})
                            })
                //if not found; AKA null
                } else {
                    res.status(400).json({message: 'Category does not exist'})
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({message: err.message, note: 'Please see console log for details'})
            })
    }
    static editItem(req, res) {
        Item
            .update({
                _id: req.body._id
            },{
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                stock: req.body.stock,
                category: req.body.category
            })
            .then(data => {
                if(data.n !== 0) {
                    console.log('ok')
                    res.status(200).json({message: "Data has been updated"})
                } else {
                    console.log("item not found")
                    res.status(500).json({message: "Item not found", note: 'Please see console log for details'})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: err.message, note: 'Please see console log for details'})
            })
    }
    static deleteItem(req, res) {
        Item
            .deleteOne({
                _id: req.body._id
            })
            .then(data => {
                if(data.n !== 0) {
                    res.status(200).json({message: "Data has been Deleted"})
                } else {
                    console.log("item not found")
                    res.status(500).json({message: "Item not found", note: 'Please see console log for details'})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: err.message, note: 'Please see console log for details'})
            })
    }
    // static uploadImg(req, res) {
    //     upload(req, res, (err) => {
    //         if(err) {
    //             console.log(err)
    //             res.status(500).json({message: 'Upload fail'})
    //         } else {
    //             console.log(req.file)
    //             res.redirect('back');
    //         }
    //     })
    // }
}

module.exports = Controller