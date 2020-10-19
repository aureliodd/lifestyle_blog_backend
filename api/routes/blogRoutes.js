'use strict'

//endpoints

module.exports = function(app) {
  var posts = require('../controllers/PostController')
  var comments = require('../controllers/CommentController')
  var users = require('../controllers/UserController')

  // Routes
  app.route('/posts')
    .get(posts.list_all_posts)
    .post(posts.create_a_post)


  app.route('/posts/:postId') 
    .delete(posts.delete_a_post)
    .patch(posts.patch_a_post)


  app.route('/comments')
    .get(comments.list_all_comments)

/*    app.route('/comments/:commentId')
    .patch(comments.modify_comment)
    .delete(comments.delete_comment); */

  app.route('/comments/:commentId')
    .delete(comments.delete_a_comment)

  app.route('/comments/:postId')
    //.get(comments.list_comments_for_a_post)
    .post(comments.create_comment_for_a_post)


  app.route('/users')
    .get(users.get_users)
    .post(users.create_user)

};


