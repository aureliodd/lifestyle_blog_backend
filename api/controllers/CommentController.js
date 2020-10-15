'use strict';

var mongoose = require('mongoose')
var Comment = mongoose.model('Comment')
var Post = mongoose.model('Post')

exports.list_all_comments = function(req, res) {

    var query = req.query
  
    Comment.find(query,function(err, post) {
      if (err) res.send(err)

      res.json(post)
    })
  }

exports.create_comment_for_a_post = function(req, res){

    console.log("postId", req.params.postId);

    var new_comment = new Comment(req.body)

     new_comment.save(function(err, post) {
        if (err) res.send(err)
        res.json(post)
      })

      console.log(Post.findOne({ _id: req.params.postId }))

    Post
        .findOne({ _id: req.params.postId })
        .populate('comment')
        .exec(function(err, post) {
        if (err) return handleError(err)
        //console.log("Nuovo commento: ", post)
      })
}
