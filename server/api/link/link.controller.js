'use strict';

var _ = require('lodash');
var Link = require('./link.model');
var User = require('../user/user.model');

var request = require('request');
var cheerio = require('cheerio');
var beagle = require('beagle');

beagle.scrape("http://www.nytimes.com/2015/04/05/world/europe/a-norway-town-and-its-pipeline-to-jihad-in-syria.html?hp&action=click&pgtype=Homepage&module=first-column-region&region=top-news&WT.nav=top-news&_r=0", function(err, bone){
    console.log(bone.preview);
    console.log(bone.favicon);
    console.log(bone.preview);
    console.log(bone.favicon);
    console.log(bone.url);
    console.log(bone.origin);
    // console.log(bone.protocol);
    // console.log(bone.host);
    // console.log(bone.port);
    // console.log(bone.path);


});



// Get list of links
exports.index = function(req, res) {
  Link.find(function (err, links) {
    if(err) { return handleError(res, err); }
    return res.json(200, links);
  });
};

// Get a single link
exports.show = function(req, res) {
  Link.findById(req.params.id, function (err, link) {
    if(err) { return handleError(res, err); }
    if(!link) { return res.send(404); }
    return res.json(link);
  });
};

// Creates a new link in the DB.

exports.create = function(req, res) {
  console.log("THIS IS THE ID!!! ________________________________________________|||||",req.body._id);  
  beagle.scrape(req.body.url, function(err, bone){
    var title = bone.preview;
    var favicon = bone.favicon;
    if (favicon[0] === '/' && favicon[1] !=='/'){
      favicon = bone.origin + favicon;
    }
    Link.create({url: req.body.url, favicon: favicon, title: title, userId: req.body._id}, function(err, link) {
      User.findById(req.body._id, function (err, user) {
        user.links.push(link._id);
        user.save(function(err){
          if(err) { return handleError(res, err); }
          User.findById(req.body._id)
            .populate('links')
            .exec(function(err, user){
              console.log("user profile", user);
              if (err) return next(err);
              if (!user) return res.send(401);
              res.json(user);
            });
        })
      })
    })
  }) 
};

// Updates an existing link in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Link.findById(req.params.id, function (err, link) {
    if (err) { return handleError(res, err); }
    if(!link) { return res.send(404); }
    var updated = _.merge(link, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, link);
    });
  });
};

// Deletes a link from the DB.
exports.destroy = function(req, res) {
  Link.findById(req.params.id, function (err, link) {
    if(err) { return handleError(res, err); }
    if(!link) { return res.send(404); }
    link.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}