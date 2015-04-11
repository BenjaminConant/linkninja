'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BoardSchema = new Schema({
  title: {type:String, default: "untitled"},
  Description: {type: String, default: "No Description"},
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  links: [{type: Schema.Types.ObjectId, ref: 'Link'}],
});

module.exports = mongoose.model('Board', BoardSchema);