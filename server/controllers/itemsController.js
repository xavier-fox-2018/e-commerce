const itemModel = require('../models/product')

class Controller {
    static getAllItems(req, res) {
        itemModel.find()
            .populate('category')
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }

    static getItemsByCategory(req, res) {
        itemModel.find()
            .populate('category')
            .then(data => {
                let filtered = data.filter(val => {
                    return val.category.name === req.body.category
                })
                res.send(filtered)
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }

    static searchItems(req, res) {
        itemModel.find()
            .populate('category')
            .then(data => {
                let filtered = data.filter(val => {
                    if (val.name.toLowerCase().includes(req.body.search.toLowerCase()) == true) {
                        return val
                    }
                })
               res.send(filtered)
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }
}

module.exports = Controller