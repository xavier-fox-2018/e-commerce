const Category = require('../models/category.js')
const ObjectId = require('mongoose').Types.ObjectId
const Item = require('../models/item.js')
const User = require('../models/user')

module.exports = {
    read : (req, res) => {
        Category
            .find({})
            .populate('item_list')
            .then( categories => {
                res.status(200).json( { categories } )
            })
            .catch( error => {
                res.status(500).json( { message : 'Error while read categories', error : error.message})
            })
    },
    create : (req, res) => {
      
       
        let category = new Category({ name : req.body.name })
        category
            .save()
            .then( newcategory => {
                res.status(200).json( newcategory)
            })
            .catch( error => {
                res.status(500).json( { message : 'Error while create categories', error : error.message})
            })
    }, 
    update : (req, res) => {
        let id = ObjectId(req.params.id)
        let data = req.body
       
        Category
            .findById(id)
            .then( category => {

                if ( category ) {
                    category.set( data )
                   
                    category
                        .save()
                        .then( respose => {
                            res.status(200).json( respose )
                        })
                        .catch( error => {
                            res.status(500).json({ message : 'error while update  categories ', error : error.message})
                        })        
                }else {
                    res.status(500).json({ error : 'Maaf categories list tidak ditemukan!'})    
                }  
            })
            .catch( error => {
                res.status(500).json( { message : 'Error while update categories ', error:error.message})
            })
        
    },
    destroy : (req, res) => {
        let id = ObjectId( req.params.id )
        Category
            .findByIdAndDelete( id )
            .then( response => {
                res.status(200).json( response )
            })
            .catch( error => {
                res.status(500).json( { message : 'Error while destroy categories', error : error.message})
            })
    },
    addItem : (req, res) => {
        
        console.log(req)
        // let createdNewItem = null
        // let category_id = req.body.category_id

        // let item = new Item({ name : req.body.name, description : req.body.description, stock : Number(req.body.stock), price : Number(req.body.price ),url : req.file.cloudStoragePublicUrl})
        
        // item
        //     .save()      
        //     .then( newitem => {
        //         createdNewItem = newitem
        //         return Category.findById( category_id )
        //     })
        //     .then( category => {
                
        //         category.item_list.push(createdNewItem._id)
        //         return category.save()
        //     })
        //     .then( response_adding_item_to_category => {
        //         res.status(200).json( createdNewItem )
        //     })
        //     .catch( error => {
        //         res.status(500).json({ message : error.message})
        //     })
    },
    removeItem : (req, res) => {
        let item_id = ObjectId( req.params.id )
        let category_id = req.body.category_id
        
        Category
            .findById( category_id )
            .then( category => {
                let item = category.item_list.find( item => {
                    return item.equals( item_id )
                })
                res.send(item)
                category.item_list.pull(item._id)
                return category.save()
            })
            .then( response_remove_item_from_category => {
                return Item.findByIdAndDelete(item_id)
            })
            .then( itemdeleted => {
                res.status(200).json(itemdeleted)
            })
            .catch( error => {
                res.status(500).json( { message : 'Error while remove item in categories', error : error.message})
            })
    },
    addToCart : (req, res) =>{
        
        let buyer = null
        let user_id = req._id
        let item_id = req.params.id
        let numberBuy = Number(req.body.numberBuy)

        
        User
            .findById( user_id )
            .then( user => {
                buyer = user
                return Item.findById(item_id)
            })
            .then( item => {

                if ( item.stock > 0) {
                    item.stock -= numberBuy
                    let itemincart = buyer.carts.find( item => {
                        return item._id.equals(item_id)
                    })
                    if( itemincart ) {
                        itemincart.number += Number(numberBuy)
                      
                    }else {
                        buyer.carts.push({ _id : item._id, number : numberBuy})
                    }

                    return Promise.all([ item.save(), buyer.save()])
                }else {
                    res.status(500).json( { message : 'Error item sold out', error:'Stock sudah habis'})
                }
                
            })
            .then( response_add_to_cart => {
                res.status(200).json( response_add_to_cart )
            })
            .catch( error => {
                res.status(500).json( { message : 'Error while add to cart', error : error.message})
            }) 
    },
    removeFromCart : (req, res) => {
        let buyer = null
        let user_id = req._id
        let item_id = req.params.id
        let numberBuy = Number(req.body.numberBuy)

        User
            .findById( user_id )
            .then( user => {
                buyer = user
                return Item.findById(item_id)
            })
            .then( item => {
                
                let itemincart = buyer.carts.find( item => {
                    return item._id.equals(item_id)
                })
                
                if ( itemincart ) {
                    item.stock += numberBuy

                    if( itemincart.number === 1){
                        buyer.carts.pull(itemincart._id)
                    }else {
                        itemincart.number -= numberBuy
                    }

                    return Promise.all([ buyer.save(), item.save()])
                }else {
                    res.status(500).json( { message : 'Error while add to cart', error : error.message})
                }
            })
            .then( response_remove_from_cart => {
                res.status(200).json( response_remove_from_cart)
            })
            .catch( error => {
                res.status(500).json( { message : 'Error while add to cart', error : error.message})
            })
    }
}