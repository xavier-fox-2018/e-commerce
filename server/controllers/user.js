const User = require('../models/user'),
      hash = require('bycjwt')

class Controller {



    static showAllUser(req, res) {
        User.find({})
            .then( users => {
                console.log('Berhasil tampilkan semua user', users);
                res.status(200).json({
                    message: `Successfully retrieved all user data`,
                    data: users
                })
            })
            .catch(err => {
                console.log('Gagal tampilkan semua user', err);
                res.status(500).json({
                    message: `Failed to retrieve all user data`,
                    data: err
                })
                
            })
    }

    static update(req,res) {
        User.updateOne({_id: req.data._id }, {$set: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash.bcencode(req.body.password),
            phone: req.body.phone,
            address: req.body.address,
            image: req.body.image,
            money: req.body.money
        }})
            .then(user => {
                console.log('Berhasil update user', user);
                res.status(201).json({
                    message: `user has been successfully updated.`,
                    data: user
                })
            })
            .catch(err => {
                console.log('Error saat update user', err);          
                res.status(500).json({
                    message: 'Failed to update user',
                    error: err
                })
            })
    }

    static search(req, res) {
        User.find({$or: [
            {first_name: new RegExp(req.query.search, 'i')},
            {last_name: new RegExp(req.query.search, 'i')}
        ]})
            .then(users => {
                console.log('Berhasil search');
                res.status(200).json({
                    message: `Searched successfully`,
                    data: users
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

    // static remove(req,res) {
    //     User.deleteOne({_id: req.params.id})
    //     .then(() => {
    //         User.findOneAndUpdate({
    //             todo_list: req.data._id
    //         }, {
    //             $pull: { todo_list: req.params.id}
    //         })
    //             .then(() => {
    //                 console.log('Berhasil delete todo', todo);
    //                 res.status(201).json({
    //                     message: `todo has been successfully deleted.`
    //                 })
    //             })
    //             .catch(err => {
    //                 res.status(500).json({message: err})
    //             })

    //     })
    //     .catch(err => {
    //         console.log('Error saat remove todo', err)
    //         res.status(500).json({
    //             message: 'Error saat remove todo',
    //             error: err
    //         })
            
    //     })
    // }

}

module.exports = Controller 