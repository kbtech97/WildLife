var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");

//LANDING RAUITE
router.get("/", function(req, res){
res.render("landing")
});


//AUTH RAUITE
//=============================

// REGISTER RAUITE
router.get("/register", function(req, res){
res.render("user/register");
});

router.post("/register", function(req, res){
var newUser = new User({username: req.body.username})
User.register(newUser, req.body.password, function(err, user){
if(err){
  req.flash("error", err.message);
  return res.render("user/register");
}
passport.authenticate("local")(req, res, function(){
  req.flash("success", "Wellcome to Wild Life " + user.username);
  res.redirect("/campgrounds");
});
});
});

//LOGIN RAUITE
router.get("/login", function(req, res){
res.render("user/login")
});

router.post("/login", passport.authenticate("local",
{
successRedirect: "/campgrounds",
failureRedirect: "/login"
}), function(req, res){
});

//LOGEOUT RAUITE
router.get("/logout", function(req, res){
req.flash("success", "You are Successfully Logout")
req.logout();
res.redirect("/campgrounds");
});


module.exports = router;
