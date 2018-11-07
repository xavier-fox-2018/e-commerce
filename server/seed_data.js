const User = require('./models/user')
const Category = require('./models/category')
const crypto = require('crypto')

const buf = crypto.randomBytes(256)
const hash = crypto.createHmac('sha256', buf)
                    .update('admin')
                    .digest('hex')

let user = new User({
  name: 'admin',
  password: hash,
  salt: buf,
  email: 'admin@gmail.com',
  role: 'admin'
})

user.save()
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })

let category = new Category({
  name: "Notebook"
})
category.save()

category = new Category({
  name: "Desktop"
})
category.save()

category = new Category({
  name: "Accessories"
})
category.save()

category = new Category({
  name: "Parts"
})
category.save()