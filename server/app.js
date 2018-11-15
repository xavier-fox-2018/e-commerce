const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./routes/index.js');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use('/', router);

mongoose.connect('mongodb://ecommerce:123ecommerce@ds155653.mlab.com:55653/ecommerce', {
    useNewUrlParser: true,
    useCreateIndex: true
});

app.listen(port, function() {
    console.log(`Running on port ${port}`);
});