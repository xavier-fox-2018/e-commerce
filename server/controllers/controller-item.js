const ObjectId = require('mongoose').Types.ObjectId
const Item = require('../models/item.js')

module.exports = {
    read : (req, res) => {
        Item
            .find({})
            .then( item => {
                res.status(200).json( items )
            })
            .catch( error => {
                res.status(500).json( { message : 'Error while read items', error : error.message})
            })
    },
    update : (req, res) => {
        let id = ObjectId(req.params.id)
        let data = req.body
       
        Item
            .findById(id)
            .then( item => {

                if ( item ) {
                    item.set( data )
                   
                    item
                        .save()
                        .then( respose => {
                            res.status(200).json( respose )
                        })
                        .catch( error => {
                            res.status(500).json({ message : 'error while update  item ', error : error.message})
                        })        
                }else {
                    res.status(500).json({ error : 'Maaf item list tidak ditemukan!'})    
                }  
            })
            .catch( error => {
                res.status(500).json( { message : 'Error while update item ', error:error.message})
            })
        
    }
}