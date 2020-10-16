'use strict';

var mongoose = require('mongoose')
var Post = mongoose.model('Post')
var Comment = mongoose.model('Comment')

exports.list_all_comments = function(req, res) {

    var query = req.query
  
    Comment.find(query,function(err, post) {
      if (err) res.send(err)

      res.json(post)
    })
  }

exports.create_comment_for_a_post = function(req, res){

  var new_comment = new Comment(req.body)

  new_comment.save(function(err, comment) {
    if (err) res.send(err)

    Post.findOne({ _id: req.params.postId }, function(error,post){
      post.post_comments.push(comment._id)
      post.save()
    })
    res.json(comment)
  })
}

exports.delete_a_comment = function(req, res){
  Comment.deleteOne({_id: req.params.commentId},
    function(err, post) {
    if (err)
      res.send(err);
    res.json({post});
  });
}
