'use strict';

var mongoose = require('mongoose')
var Post = mongoose.model('Post')
var Comment = mongoose.model('Comment')

exports.list_all_comments = function(req, res) {
  
    Comment.find(req.query,function(err, post) {
      if (err) res.send(err)

      res.json(post)
    })
  }

exports.create_comment_for_a_post = function(req, res){

  if(req.params.postId){
    var new_comment = new Comment(req.body)

    new_comment.save(function(err, comment) {
      if (err) {res.send(err); return}
  
      Post.findOne({ _id: req.params.postId }, function(error,post){
        if(error) res.json(error)

        post.post_comments.push(comment._id)
        post.save()
      })
      res.json(comment)
    })
  } else 
    res.json({message: 'post non specificato'})

}

exports.delete_a_comment = function(req, res){
  
    Comment.deleteOne({_id: req.params.commentId},
      function(err, post) {
      if (err) {res.send(err); return}

      res.json({message: 'post eliminato correttamente'})
      })
}
