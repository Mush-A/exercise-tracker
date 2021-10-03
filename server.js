const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongo = require('./db/connect')

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.use(express.urlencoded({extended : false}))

const api = require('./routes/api');
app.use('/api', api);

mongo.connectDB()
.then(() => app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ', process.env.PORT)
}))
.catch(err => console.log(err))