const route = require('express').Router();

const userRoute = require('./user.js');
const itemRoute = require('./item.js');
const categoryRoute = require('./category.js');

route.use('/users', userRoute);
route.use('/items', itemRoute);
route.use('/categories', categoryRoute);

module.exports = route;