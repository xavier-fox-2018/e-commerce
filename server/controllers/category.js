const Category = require('../models/category')


class Controller {

    static create(req, res) {

        const category = new Category({
            name: req.body.name
        })

        category.save()
            .then(category => {

                console.log('Berhasil tambah category ke shop');
                res.status(201).json({
                    message: `Successfully added ${category.name} to list of categories`
                })

            })
            .catch(err => {
                console.log('Gagal create category,', err);
                res.status(500).json({
                    message: `Failed to create category ${category.name}`,
                    error: err
                })
            })
    }

}

module.exports = Controller