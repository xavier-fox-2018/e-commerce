//copas command on mongod cli 

db.User.insertOne({
  firstName: 'theo',
  lastName: 'darmawan',
  username: 'admin',
  role: 'admin',
  password: 12345,
  items: []
})
db.users.insertOne({
  email:'dan',
  firstName: 'dan',
  lastName: 'darmawan',
  role:'admin',
  password: 12345,
  items: ['5be15f537fa7721a79080e75']
})


db.items.insertMany([{
    name :'Queen Room',
    stock :10, 
    price : 1000,
    category: 'Room',
    ratings : [4,4,5],
    reviews : ['good room','enjoyable stay']
  },

{
  name :'King Suite',
  stock :5, 
  price : 2000,
  category: 'Room',
  ratings : [5,5,5],
  reviews : ['great room','very enjoyable stay']
},

{
  name :'Standard Room',
  stock :15, 
  price : 500,
  category: 'Room',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay']
}])