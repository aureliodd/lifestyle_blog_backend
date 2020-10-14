const express = require('express');

var app = express();
const port = process.env.PORT || 3000;

var Post = require('./api/models/Posts');

const mongoose = require('mongoose');
const uri = "mongodb+srv://durso_aurelio:6RdDEJ6jmDRHvkfR@cluster0.vgxik.mongodb.net/Blogdb?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  }).catch(err => console.log(err.reason));


bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
var routes = require('./api/routes/blogRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('blog avviato nella porta: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });