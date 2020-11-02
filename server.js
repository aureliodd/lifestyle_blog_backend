const express = require('express');

var app = express();
const port = process.env.PORT || 3000;

var Post = require('./api/models/Post');
var Comment = require('./api/models/Comment');
var User = require('./api/models/User');

const mongoose = require('mongoose');
const uri = "mongodb+srv://durso_aurelio:MYSNJ6qYumNBaGCp@cluster0.vgxik.mongodb.net/Blogdb?retryWrites=true&w=majority";
mongoose.set('useCreateIndex', true) //altrimenti dà warning
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  }).catch(err => console.log(err.reason));


/*   app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  }) */

  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept')


    // Pass to next layer of middleware
    next()
})


bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
var routes = require('./api/routes/blogRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('blog avviato nella porta: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
    next(); //necessario per non avere problemi
  });






