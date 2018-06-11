  var express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      flash         = require("connect-flash"),
      passport      = require("passport"),
      LocalStrategy = require("passport-local"),
      methodOverriede = require("method-override"),
      Campgrounds   = require("./models/campground"),
      Comments      = require("./models/comment"),
      User          = require("./models/user");

// REQUIRE RAUITE
  var commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      authRoutes       = require("./routes/auths");

//mongoose.connect("mongodb://kallal:kallal@ds237409.mlab.com:37409/wildlife");
mongoose.connect("mongodb://localhost/yelp-camp-v1");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverriede("_method"));
app.use(flash());
 //PASSPOST CONFIGARETION
app.use(require("express-session")({
  secret: "this is yelpCamp logein secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authRoutes);



//SARVER
//=====================================================
app.listen(3000, function(){
  console.log("GOOD TO GO")
});
// app.listen(process.env.PORT, function(){
//  console.log("GOOD TO GO")
// });
