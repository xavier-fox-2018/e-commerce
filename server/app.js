const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const UserRoute = require('./routes/user')
const StoreRoute = require('./routes/store')
const TransactionRoute = require('./routes/transaction')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/user', UserRoute)
app.use('/store', StoreRoute)
app.use('/transaction', TransactionRoute)

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found!' })
})

app.listen(port, () => {
  console.log('Listening on port', port)
})