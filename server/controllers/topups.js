var Customer = require('../models/customers.js')
var Topup = require('../models/topups.js')
class TopupsController {
    static createTopup(req, res) {
        // res.json('hello')
        Customer.findOne({
                _id: req.logged_in_user.id
            })
            .then((response) => {
                Topup.create({
                        user_id: response._id,
                        amount: req.body.amount,
                        validation: req.file.cloudStoragePublicUrl,
                        status: "pending",
                        createdAt: new Date()
                    })
                    .then((data) => {
                        Topup.find({
                                user_id: req.logged_in_user.id
                            })
                            .then((result) => {
                                res.status(200).json(result)
                            })
                    })
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })
    }
    static verifyTopup(req, res) {
        Topup.findByIdAndUpdate({
                _id: req.params.id
            }, {
                status: "verified"
            })
            .then((data) => {
                Customer.findOne({
                        _id: data.user_id
                    })
                    .then((response) => {
                        let tmp = response.money
                        response.money += data.amount
                        response.save()
                        Topup.find({}).populate('user_id')
                            .then((result) => {
                                res.json(result)
                            })
                    })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
    static getTopup(req, res) {
        Topup.find({
                user_id: req.logged_in_user.id
            })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })
    }
    static getAll(req, res) {
        Topup.find({}).populate('user_id')
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })
    }
}
module.exports = TopupsController