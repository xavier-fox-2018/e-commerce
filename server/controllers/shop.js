const Shop = require('../models/shop'),
      User = require('../models/user')

class Controller {

    static create(req, res) {
        const shop = new Shop({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            user_id: req.data._id,
            address: req.body.address
        })

        shop.save()
            .then(shop => {

                User.findOneAndUpdate({
                    _id: req.data._id
                }, {
                    $push: { shop_list: shop._id}
                })
                    .then(() => {
                        console.log('Berhasil tambah shop ke user');
                        res.status(201).json({
                            message: `Successfully added ${req.body.name} to ${req.data.first_name}'s list of shops`
                        })
                    })
                    .catch(err => {
                        console.log('Gagal tambah shop ke user,', err);
                        res.status(500).json({
                            message: `Failed to added ${req.body.name} to ${req.data.first_name}'s list of shops`,
                            error: err
                        })
                    })

            })
            .catch(err => {
                console.log('Gagal create shop,', err);
                res.status(500).json({
                    message: `Failed to create shop ${req.body.name}`,
                    error: err
                })
            })
    }

    static showAllShops (req,res) {
        Shop.find({
            deleted: false
        })
            .then(shops => {
                console.log('ini path', req.path);
                
                console.log('Berhasil find all shop', shops);
                res.status(200).json({
                    message: `Successfully retrieve all shop`,
                    data: shops
                })
            })
            .catch(err => {
                console.log('Gagal find all shop', err);
                res.status(500).json({
                    message: `Failed to retrieve all shop`,
                    error: err
                })
            })
    }

    static update(req,res) {
        Shop.updateOne({
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

    static showAllUserShop(req,res) {

        Shop.find({
            user_id: req.data._id,
            deleted: false
        })
            .then(shops => {
                console.log('Berhasil find all user shop', shops);
                res.status(200).json({
                    message: `Successfully retrieve all of user's shop`,
                    data: shops
                })
            })
            .catch(err => {
                console.log('Gagal find all user shop', err);
                res.status(500).json({
                    message: `Failed to retrieve all of user's shop`
                })
            })

    }

    static showSingleShop(req,res) {

        Shop.findOne({
            _id: req.params.id
        })
            .then(shop => {
                console.log('Berhasil find shop', shop);
                res.status(200).json({
                    message: `Successfully retrieve all of user's shop`,
                    data: shop
                })
            })
            .catch(err => {
                console.log('Gagal find shop', err);
                res.status(500).json({
                    message: `Failed to retrieve shop`
                })
            })

    }

    static search(req, res) {
        Shop.find({$or: [
            {name: new RegExp(req.query.search, 'i')},
            {description: new RegExp(req.query.search, 'i')}
        ]})
            .then(shops => {
                console.log('Berhasil search');
                res.status(200).json({
                    message: `Searched successfully`,
                    data: shops
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