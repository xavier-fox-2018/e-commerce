const mongoose = require("mongoose");
const Category = require("../models/category");

mongoose
  .connect(
    "mongodb://localhost/ecommerce",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("mongooooo");
  })
  .catch(err => {
    console.log(err);
  });

  Category.insertMany([
        {
            name: 'Fashions'
        },
        {
            name: 'Electonics'
        },
        {
            name: 'Home & Gardens'
        },
        {
            name: 'Foods'
        },
        {
            name: 'Drinks'
        },
        {
            name: 'Books'
        }
  ])
        .then(_=> {
            console.log('succ')
        })
        .catch(err => {
            console.log(err)
        })
