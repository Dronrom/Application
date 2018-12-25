const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const analyticshRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const positionRoutes = require('./routes/position')
const orderRoutes = require('./routes/order')
const keys = require('./config/keys')
const app = express()



// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
 
// // Connection URL
// const url = 'mongodb://localhost:27017/';
 
// // Database Name
// const dbName = 'myproject';
 
// // Use connect method to connect to the server
// MongoClient.connect(mongoURI, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
 
//   const db = client.db(dbName);
 
//   client.close();
// });

mongoose.connect(keys.mongoURI)
    .then(()=> console.log('MongoBD connected.'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticshRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/order', orderRoutes)


module.exports = app 