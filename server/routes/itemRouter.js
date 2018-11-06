const itemRouter = require('express').Router();
const ItemController = require('../controllers/itemController.js');
const isLogin = require('../middlewares/isLogin.js');
const isAdmin = require('../middlewares/isAdmin.js');
const imageUploader = require('../helpers/imageUploader.js');

itemRouter.get('/', ItemController.getAll);
itemRouter.get('/:id', ItemController.getOne);
itemRouter.post('/uploadimage', isLogin, isAdmin, 
    imageUploader.multer.single('image'), 
    imageUploader.sendUploadToGCS,
    (req, res) => {
        res.status(200).json({
            message: 'Item image is successfully uploaded',
            link: req.file.cloudStoragePublicUrl
        })
});
itemRouter.post('/', isLogin, isAdmin, ItemController.add);
itemRouter.put('/:id', isLogin, isAdmin, ItemController.update);
itemRouter.delete('/:id', isLogin, isAdmin, ItemController.delete);
itemRouter.get('/search/:keyword', ItemController.searchByName);

module.exports = itemRouter;