'use strict';

var mongoose = require('mongoose')
var Post = require('./api/models/Post')
var Comment = require('./api/models/Comment')


const uri = "mongodb+srv://durso_aurelio:MYSNJ6qYumNBaGCp@cluster0.vgxik.mongodb.net/Blogdb?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  }).catch(err => console.log(err.reason));

  var id = mongoose.Types.ObjectId('5f8868dd017cb61e2d1c73e4');

  /* Post.findOne({ _id: "5f89a673b8fe091e55ce566d" }, function(error,post){
      post.post_comments.push(id)
      post.save(function(){
          process.exit() //permette al programma di uscire quando si esegue node index.js
          
      })
  }) */

Post
    .findOne({ _id: "5f89a673b8fe091e55ce566d" })
    .populate('post_comments')
    .exec(function (err, post) {
        if (err) return handleError(err)

        console.log("Nuovo commento: ", post.post_comments)
    })
    
