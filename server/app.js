const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')

// mongoose.connect('mongodb://localhost/shopping-cart', { useNewUrlParser: true})
mongoose.connect('mongodb://ecommerce-hedya1:h72f72e27@ds121871.mlab.com:21871/shopping-cart', { useNewUrlParser: true}) //masukin env



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`mongoose is connected`);
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', routes)


app.listen(port, () => {
    console.log(`listening on port ${port}`);
    
})

