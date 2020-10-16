'use strict';


var mongoose = require('mongoose'),
  Post = mongoose.model('Post');

exports.list_all_posts = function(req, res) {


  /* Post.find(query,function(err, post) {
    if (err) res.send(err);
    res.json(post);
  }); */

  Post 
    .find()
    .populate('post_comments') //per ritornare anche i commenti
    .exec(function (err, post) {
        if (err) return handleError(err)

        res.json(post)
    })

};



exports.create_a_post = function(req, res) {
  
  console.log(req.body);

    if(req.body.author == null || req.body.author == "")
        req.body.author = undefined;

    var new_post = new Post(req.body);

  new_post.save(function(err, post) {
    if (err) res.send(err);
    res.json(post);
  });
};


exports.delete_a_post = function(req, res) {
  Post.deleteOne({_id: req.params.postId},
    function(err, post) {
    if (err)
      res.send(err);
    res.json({ message: 'Post successfully deleted' });
  });


};

exports.patch_a_post = function(req, res) { 
  Post.findOneAndUpdate({_id : req.params.postId}, 
    {$set: req.body}, 
    function(err,post){
      if (err)
        res.send(err);
      res.json({ message: 'Post successfully modified' });
    }
  );
};