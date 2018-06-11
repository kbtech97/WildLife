var express       = require("express");
var router        = express.Router();
var Campgrounds   = require("../models/campground");
var Comments      = require("../models/comment");
var middlewareObj = require("../middleware/index.js");
//if i use index.js then i acn do this when require
//var middlewareObj = require("../middlewareObj);


//CAMP GARUND RAUITE
router.get("/campgrounds", function(req, res){
Campgrounds.find({}, function(err, allCampgrounds){
 if(err){
   console.log("error");
 }else {
   res.render("campgrounds/campgrounds", {campgrounds: allCampgrounds})
 }
});
});

//CAMPGRAUND CREAT RAUITE
router.get("/campgrounds/new", middlewareObj.isLoggedIn, function(req, res){
res.render("campgrounds/new");
});

router.post("/campgrounds", middlewareObj.isLoggedIn, function(req, res){
var name = req.body.name;
var price = req.body.price;
var image = req.body.image;
var description = req.body.description;
var author = {
  id: req.user._id,
  username: req.user.username
};
var newCampgrounds = {name: name, price: price, image: image, description: description, author: author}
Campgrounds.create(newCampgrounds, function(err, newlyCreated){
 if(err){
   req.flash("erroe", "Permission Denied");
   res.redirect("back")
 }else{
   req.flash("success", "Created Successfully");
   res.redirect("/campgrounds");
 }
});
});
//CAMP GRAUND SHOW RAUITE
router.get("/campgrounds/:id", function(req, res){
Campgrounds.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
 if(err){
   console.log("ERROR!!!");
 } else {
   res.render("campgrounds/show", {campground: foundCampground});
 }
});
});

// EDIT CAMPGRAUND ROUTEd
router.get("/campgrounds/:id/edit", middlewareObj.campgroundOwner, function(req, res, next){
    Campgrounds.findById(req.params.id, function(err, foundCampground){
      if(err){
        req.flash("error", "Please Login or SignUp First");
        console.log("ERROR")
      }else {
        res.render("campgrounds/edit", {campground: foundCampground});
          next();
      }
  });
});
// UPDATE CAMPGRAUND ROUTE
router.put("/campgrounds/:id", middlewareObj.campgroundOwner, function(req, res){
  Campgrounds.findByIdAndUpdate(req.params.id, req.body.campground, function(err, update){
    if(err){
      req.flash("erroe", "Permission Denied");
      res.redirect("/campgrounds");
    }else {
      req.flash("success", "Successfully Edited");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DESTROY CAMPGRAUND ROUTE
router.delete("/campgrounds/:id", middlewareObj.campgroundOwner, function(req, res){
  Campgrounds.findByIdAndRemove(req.params.id, function(err){
    if(err){
      req.flash("erroe", "Permission Denied");
      res.redirect("/campgrounds");
    }else {
      req.flash("success", "Successfully Deleted");
      res.redirect("/campgrounds");
    }
  });
});


module.exports = router;
