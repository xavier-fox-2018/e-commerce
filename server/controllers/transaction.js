const Transaction = require('../models/transaction'),
      User = require('../models/user')

class Controller {
    static create(req, res) {
        console.log(req.body);
        
        const transaction = new Transaction({
            name: req.data._id,
            item_list: req.body.item_list,
            total: req.body.total
        })

        transaction.save()
            .then(transaction => {

                User.findOneAndUpdate({
                    _id: req.data._id
                }, {
                    $push: { transactions: transaction._id}
                })
                    .then(() => {
                        console.log('Berhasil tambah transaction ke user');
                        res.status(201).json({
                            message: `Successfully added to ${req.data.first_name}'s list of transactions`
                        })
                    })
                    .catch(err => {
                        console.log('Gagal tambah transaction ke user,', err);
                        res.status(500).json({
                            message: `Failed to added to ${req.data.first_name}'s list of transactions`,
                            error: err
                        })
                    })

            })
            .catch(err => {
                console.log('Gagal create transaction,', err);
                res.status(500).json({
                    message: `Failed to create transaction`,
                    error: err
                })
            })
    }
}


module.exports = Controller