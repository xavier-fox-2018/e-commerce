const Product = require('../models/product')

module.exports = {
    addProduct: (req, res) =>{
        console.log(`masuk`);
        Product.create({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            img: req.file.cloudStoragePublicUrl,
            description: req.body.description,
            category: req.body.category
        })
        .then( result =>{
            res.status(201).json({product: result})
            // console.log(result);
        })
        .catch(err =>{
            res.status(500).json({message: err})
            // console.log(err, `iniiiiii`);
        })
    },

    allProduct: (req, res) =>{
        Product.find({})
        .populate('category')
        .sort([['updatedAt', 'descending']])
        .then(result =>{
            res.status(200).json({Product: result})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
    },

    findOne: (req, res) =>{
        Product.findOne({_id: req.params.id })
        .populate('category')
        .then(result=>{
            res.status(201).json({result})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
    },

    editProduct: (req, res) =>{
        Product.update({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            // img: req.file.cloudStoragePublicUrl,
            description: req.body.description,
            category: req.body.category
        })
        .then(result=>{
            res.status(201).json({result})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
    },

    deletePro: (req, res) =>{
        Product.findByIdAndRemove({_id: req.params.id })
        .then(result =>{
            res.status(200).json({result})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
    },

    filterByCategory: (req, res) =>{
        Product.find({
            category: req.params.category
        })
        .populate('category')
        .then(result =>{
            console.log(result);
            
            res.status(200).json(result)
        })
        .catch(err =>{
            console.log(err);
            
            res.status(500).json(err)
        })
    },

    // addToCart: (req, res) => {
	// 	let userId = req.decoded.id
	// 	let updateData = {
	// 		$push: {cart: req.body.orderid},
	// 		updatedAt: new Date()
	// 	}
	// 	User.findOneAndUpdate({_id: userId}, updateData)
	// 	.then((user) => {
	// 		if(user === null) {
    //             res.status(500).json('user not found')
    //         } else {
    //             res.status(201).json("success to add cart")
    //         }
    //     })
    //     .catch((err) => res.status(500).json(err))   
	// }
    


    





}