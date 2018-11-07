var models = require('../models/items.js')
class ItemsController {
    /* POST /items/create */
    static createItem(req, res) {
        models.create({
                name: req.body.name,
                description: req.body.description,
                price: Number(req.body.price),
                stock: Number(req.body.stock)
            })
            .then(function(data) {
                res.status(200).json('Data created')
            })
            .catch(function(err) {
                res.status(500).json('error from controllers/items createController')
            })
    }

    /** GET /items */
    static getItems(req, res) {
        models.find()
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(err) {
                res.status(500).json('error dari server controllers/items.js getItems')
            })
    };


}
module.exports = ItemsController