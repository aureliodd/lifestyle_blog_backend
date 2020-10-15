'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    user: {
        type: String,
        required: 'Per favore inserire l\'utente'
    },

    body: {
        type: String,
        required: 'Inserire per favore il commento'
    }
});

module.exports = mongoose.model('Comment',CommentSchema)