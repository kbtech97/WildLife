var express = require("express");
var router  = express.Router();
var Campgrounds   = require("../models/campground");
var Comments      = require("../models/comment");
var middlewareObj = require("../middleware");
//if i use name as index.js then i acn do this when require
//var middlewareObj = require("../middlewareObj);

// NEW COMMENT FORM ROUTE
router.get("/campgrounds/:id/comments/new", middlewareObj.isLoggedIn, function(req, res){
  Campgrounds.findById(req.params.id, function(err, campground){
    if (err){
      console.log("ERROR");
    }else {
        res.render("comments/new", {campground: campground});
    }
  });
});

//CREAT NEW COMMENT ROUTE
router.post("/campgrounds/:id/comments", middlewareObj.isLoggedIn, function(req, res){
  Campgrounds.findById(req.params.id, function(err, campground){
    if (err){
      console.log("ERROR");
      res.redirect("/campgrounds");
    }else {
        Comments.create(req.body.comment, function(err, comment){
          if(err){
            console.log("ERROR");
            res.redirect("back");
          }else {
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
            campground.comments.push(comment);
            campground.save();
            res.redirect("/campgrounds/" + campground._id);
          }
        });
    }
  });
});

// EDIT COMMENT ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit", middlewareObj.commentOwner, function(req, res){
  Comments.findById(req.params.comment_id, function(err, foundComment){
    if (err){
      res.redirect("back");
    }else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  });
});

// UPDATE COMMENT
router.put("/campgrounds/:id/comments/:comment_id", middlewareObj.commentOwner, function(req, res){
  Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updated){
    if(err){
      res.redirect("back")
    }else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DETETE COMMENT ROUTE
router.delete("/campgrounds/:id/comments/:comment_id", middlewareObj.commentOwner, function(req, res){
  Comments.findByIdAndRemove(req.params.comment_id, function(err, removed){
    if(err){
      res.redirect("back")
    }else {
      res.redirect("/campgrounds/" + req.params.id)
    }
  })
});


module.exports = router;
