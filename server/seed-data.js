//copas command on mongod cli 

db.users.insertOne({
  email: 'user1@mail.com',
  firstName: 'theo',
  lastName: 'darmawan',
  role: 'admin',
  password: '12345',
  items: []
})
db.users.insertOne({
  email:'user2@mail.com',
  firstName: 'dan',
  lastName: 'darmawan',
  role:'admin',
  password: '12345',
  items: []
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
},

{
  name :'Indonesia',
  price : 500,
  category: 'Asia/Oceania',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl: 'assets/destinations/bali.jpg',
   createdBy:'5be8877e37899199b056664e'
},
{
  name :'China - Japan',
  price : 500,
  category: 'Asia/Oceania',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl:'assets/destinations/japan.jpg',
   createdBy:'5be8877e37899199b056664e'
},
{
  name :'West Coast USA',
  price : 500,
  category: 'Americas',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl:'assets/destinations/oceania-2.jpg',
   createdBy:'5be8877e37899199b056664e'
},
{
  name :'Latin-America',
  price : 500,
  category: 'Americas',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl:'assets/destinations/usa.jpg',
   createdBy:'5be8877e37899199b056664e'
},
{
  name :'Scandinavia',
  price : 500,
  category: 'Europe',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl:'assets/destinations/usa.jpg',
   createdBy:'5be8877e37899199b056664e'
},
{
  name :'Italy -Greece',
  price : 500,
  category: 'Europe',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl:'assets/destinations/washington.jpg',
   createdBy:'5be8877e37899199b056664f'
},
{
  name :'Carribean',
  price : 500,
  category: 'Other',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl:'assets/destinations/bahamas.jpg',
   createdBy:'5be8877e37899199b056664f'
},
{
  name :'South Africa -Madagascar',
  price : 500,
  category: 'Other',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl:'assets/destinations/bali.jpg',
  createdBy:'5be8877e37899199b056664f'
}]
)