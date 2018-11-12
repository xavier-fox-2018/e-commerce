const router = require('express').Router(),
      ShopCont = require('../controllers/shop'),
      ItemCont = require('../controllers/item'),
      { authenticate, authorize } = require('../middlewares/auth')

router
    .post('/', authenticate, authorize, ShopCont.create)
    .get('/', ShopCont.showAllShops)
    .get('/search?', ShopCont.search)
    .put('/:id', authenticate, authorize, ShopCont.update)
    .get('/mine', authenticate, authorize, ShopCont.showAllShops)

    .post('/:id/items', authenticate, authorize, ItemCont.create)
    .get('/:id/items', authenticate, authorize, ItemCont.showAllShopItems)
    .get('/items', ItemCont.showAllItems)
    .get('/items/search?', ItemCont.search)
    
module.exports = router