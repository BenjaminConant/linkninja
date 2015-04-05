'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LinkSchema = new Schema({
  url: String,
  favicon: String,
  title: String
});

module.exports = mongoose.model('Link', LinkSchema);