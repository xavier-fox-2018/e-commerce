const Item = require('../models/item'),
      Shop = require('../models/shop')

class Controller {

    static create(req, res) {

        console.log('ini query', req.path.split('/')[1])
        
        const item = new Item({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            shop_id: req.path.split('/')[1]
        })

        item.save()
            .then(item => {

                Shop.findOneAndUpdate({
                    _id: req.path.split('/')[1]
                }, {
                    $push: { item_list: item._id}
                })
                    .then(() => {
                        console.log('Berhasil tambah item ke shop');
                        res.status(201).json({
                            message: `Successfully added ${req.body.name} to shop's list of items`
                        })
                    })
                    .catch(err => {
                        console.log('Gagal tambah item ke shop,', err);
                        res.status(500).json({
                            message: `Failed to add ${req.body.name} to shop's list of items`,
                            error: err
                        })
                    })

            })
            .catch(err => {
                console.log('Gagal create item,', err);
                res.status(500).json({
                    message: `Failed to create item ${req.body.name}`,
                    error: err
                })
            })
    }

    static showAllItems (req,res) {
        Item.find({
            deleted: false
        })  
            .populate('shop_id')
            .populate('category_list')
            .then(items => {
                console.log('Berhasil find all items', items);
                res.status(200).json({
                    message: `Successfully retrieve all items`,
                    data: items
                })
            })
            .catch(err => {
                console.log('Gagal find all items', err);
                res.status(500).json({
                    message: `Failed to retrieve all items`,
                    error: err
                })
            })
    }

    static showAllShopItems (req,res) {
        Item.find({
            shop_id: req.path.split('/')[1],
            deleted: false
        })
            .then(items => {
                console.log('Berhasil find all shop items', items);
                res.status(200).json({
                    message: `Successfully retrieve all shop items`,
                    data: items
                })
            })
            .catch(err => {
                console.log('Gagal find all shop items', err);
                res.status(500).json({
                    message: `Failed to retrieve all shop items`,
                    error: err
                })
            })
    }

    static update(req,res) {
        Item.updateOne({
            _id: req.params.id,
            user_id: req.data._id
         }, {
            $set: {
                name: req.body.name,
                image: req.body.image,
                description: req.body.description,
                address: req.body.address
            }
        })
            .then(shop => {
                console.log('Berhasil update shop', shop);
                res.status(201).json({
                    message: `Successfully updated shop.`,
                    data: shop
                })
            })
            .catch(err => {
                console.log('Gagal update shop', err);          
                res.status(500).json({
                    message: 'Failed to update shop',
                    error: err
                })
            })
    }


    static search(req, res) {
        Item.find({$or: [
            {name: new RegExp(req.query.search, 'i')},
            {description: new RegExp(req.query.search, 'i')}
        ]})
            .then(items => {
                console.log('Berhasil search');
                res.status(200).json({
                    message: `Searched successfully`,
                    data: items
                })
            })
            .catch(err => {
                console.log('Gagal search' + err);
                res.status(200).json({
                    message: `Failed to search`,
                    error: err
                })
            })
    }

}

module.exports = Controller 