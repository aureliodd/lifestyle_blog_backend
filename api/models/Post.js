'use strict';
var mongoose = require('mongoose');
const Comments = require('./Comment');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: 'per favore inserire il titolo'
  },

  description:{ //sottotitolo
    type: String,
  },

  author: {
    type: String,
    default: "Anonymous"
  },

  body: {
    type: String,
    required: 'per favore inserire il corpo del post'
  },

  featured: {
    type: Boolean,
    default: false
  },

  status: {
    type: [{
      type: String,
      enum: ['public', 'draft']
    }],
    default: ['draft']
  },

  tags: {
    type: [String] //array di tag
  },

  image: {
    type: String //link ad un'immagine
  },

  created_date: { 
    type: Date,
    default: Date.now
  },

  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]

});

module.exports = mongoose.model('Post', PostSchema); //mongoose richiede di chiamare il model e passare due parametri: il nome della tabella, e il riferimento allo schema creato