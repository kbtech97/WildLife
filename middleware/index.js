var Campgrounds = require("../models/campground");
var Comments    = require("../models/comment");

var middlewareObj = {};

//CHAKE CAMPGROUND QWNER
middlewareObj.campgroundOwner = function(req, res, next){
    if(req.isAuthenticated()){
      Campgrounds.findById(req.params.id, function(err, foundCampground){
        if(err){
          req.flash("error", "Campground not found");
          res.redirect("back");
        }else {
          if(foundCampground.author.id.equals(req.user._id)){
            next();
          }else {
            req.flash("error", "Permission Denied");
            res.redirect("back");
          }
        }
      });
    }else {
      req.flash("error", "Please Login or SignUp");
      res.redirect("back");
    }
}

//CHAKE CAMP COMMENT QWNER MIDDILWARE
middlewareObj.commentOwner = function(req, res, next){
    if(req.isAuthenticated()){
      Comments.findById(req.params.comment_id, function(err, foundComment){
        if(err){
          res.redirect("back");
        }else {
          if(foundComment.author.id.equals(req.user._id)){
            next();
          }else {
              req.flash("error", "Permission Denied");
            res.redirect("back");
          }
        }
      });
    }else {
      req.flash("error", "Please Login or SignUp");
      res.redirect("back");
    }
  }

  //IS LOGE IN MIDDILWARE

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
  return next();
  }
  req.flash("error", "Please Login or SignUp First");
  res.redirect("/login");
  }



module.exports = middlewareObj
