const Item = require('../models/item'),
      Category = require('../models/category'),
      ObjectId = require('mongodb').ObjectId;

// FIRST CATEGORY
let newItem = new Item({
  name: 'TESTER',
  price: '2',
  stock: '1',
  image: 'https://cdn-images-1.medium.com/max/1800/1*Pxmm24WKcYUqFC1Fsh_n7g.png',
  category: 'single-origin'
})

newItem.save()
  .then(data => {
    // FIRST ITEM
    let newCategory = new Category({
      name: data.category,
      itemsId: [ ObjectId(data._id) ]
    })

    newCategory.save()
      .then(dataCat => console.log(dataCat))
      .catch(err => console.log(err))

  })
  .catch(err => console.log(err))