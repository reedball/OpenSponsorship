const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 8080;
const User = require('./database/Users');

//Database-MongoDB-connect
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useCreateIndex: true}).then(
    () => {console.log(`Database is connected - 'mongodb://localhost:27017/test`)},
    err => {console.log(`Can't connect to the database - ${err}`)}
);

app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

var publicDir = path.join(__dirname,'/public');
app.use(express.static(publicDir));

app.get('/', (req, res) => {

  
});

app.post('/user', (req, res) => {
let user = new User(req.body);
user.save().then(doc => {
  res.send(user)
}).catch(err => {
  console.log(err)
  res.send(err);
})
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});