/*
Array.from(document.querySelectorAll('d')).map((each) => each.src) // ? Product image

FORBIDDEN:
https://s-ecom.ottenstatic.com/thumbnail/57cfb8ad4f06a.png => 500g icon

Array.from(document.querySelectorAll('div.product-card-info span.product-card-name')).map((each) => each.innerText.trim()) // ? name
Array.from(document.querySelectorAll('div.product-card-info span.product-card-new-price')).map((each) => each.innerText.trim().split(' ')[1].split('.').join('')) // ? price
document.URL.split('.id/')[1] // ? category name

*/
// ! BASIC CONFIG
const puppeteer = require('puppeteer'),
      express = require('express'),
      app = express(),
      port = process.env.PORT || 3030,
      mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      url = 'mongodb://localhost:27017',
      dbName = 'ecommerce',
      client = new MongoClient(url);

// app.use(routes)

mongoose.connect('mongodb://localhost/ecommerce')

app.listen(port, () => console.log(`Listening on ${port}`))

const Item = require('../models/item'),
      Category = require('../models/category'),
      ObjectId = require('mongodb').ObjectId;

const beansURL = [
  // 'https://ottencoffee.co.id/single-origin',
  // 'https://ottencoffee.co.id/ninety-plus-coffee',
  // 'https://ottencoffee.co.id/syrups',
  // 'https://ottencoffee.co.id/capsules',
  // 'https://ottencoffee.co.id/drip-coffee',
  // 'https://ottencoffee.co.id/green-bean',
  // 'https://ottencoffee.co.id/commercial',
  // 'https://ottencoffee.co.id/powder'
]

const equipmentsURL = [
  // 'https://ottencoffee.co.id/automatic-machine',
  // 'https://ottencoffee.co.id/coffee-maker',
  // 'https://ottencoffee.co.id/manual-semi-automatic',
  // 'https://ottencoffee.co.id/electric-grinder',
  // 'https://ottencoffee.co.id/manual-grinder',
  // 'https://ottencoffee.co.id/aeropress',
  // 'https://ottencoffee.co.id/cold-brewers',
  // 'https://ottencoffee.co.id/mokapot'
]

const toolsURL = [
  // 'https://ottencoffee.co.id/digital-timer',
  // 'https://ottencoffee.co.id/tampers',
  // 'https://ottencoffee.co.id/shot-glass',
  // 'https://ottencoffee.co.id/porta-filters',
  // 'https://ottencoffee.co.id/knock-box'
]

toolsURL.forEach(async (each) => {
  // delaying process
  function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    });
  }

  // autoscroll
  function autoScroll(page) {
    return page.evaluate(() => {
      return new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      })
    });
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(each);
  await delay(1500)
  await autoScroll(page);

  // ! Taking important parts
  const image = await page.evaluate(() => Array.from(document.querySelectorAll('div.product-card-img a img')).map((each) => each.src));
  const name = await page.evaluate(() => Array.from(document.querySelectorAll('div.product-card-info span.product-card-name')).map((each) => each.innerText.trim()));
  const price = await page.evaluate(() => Array.from(document.querySelectorAll('div.product-card-info span.product-card-new-price')).map((each) => each.innerText.trim().split(' ')[1].split('.').join('')));
  const categoryName = await page.evaluate(() => document.URL.split('.id/')[1]);


  // ? removing clutter images
  for (let i = 0; i < image.length; i++) {
    if (image[i] === 'https://s-ecom.ottenstatic.com/thumbnail/57cfb8ad4f06a.png') {
      image.splice(i, 1)
      i--
    }
  }

  // ! MAKING CATEGORY
  let newCategory = new Category({
    name: categoryName,
    itemsId: []
  })

  newCategory.save()
    .then(dataCat => console.log(dataCat))
    .catch(err => console.log(err))

  // ? turning into array
  for (let i = 0; i < image.length; i++) {
    let newItem = new Item({
      name: image[i],
      price: price[i],
      stock: 100,
      image: name[i],
      category: categoryName
    })

    newItem.save()
      .then(data => {
        client.connect(function (err, client) {
          assert.equal(null, err);
          const categoriesData = client.db(dbName).collection('categories')
          categoriesData.updateOne(
            { name: data.category }, // ?  datengnya dari mana coba ha
            { $push: { itemsId: data._id } },
            (err, result) => {
              err ? console.log(err) : console.log(result)
            }
          )
        });

      })
      .catch(err => console.log(err))
  }

  // 

  await console.log(endResult)
  await browser.close();
})