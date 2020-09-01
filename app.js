
const express = require('express'),
 app = express(),
 port = 3000,
 mongoose = require("mongoose"),
 passport = require("passport"),
 localStrategy = require("passport-local"),
 passportLocalMongoose = require("passport-local-mongoose"),
 User = require("./models/user");

let bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('useFindAndModify', false);
app.use(require("express-session")({
 secret: "Stardew Valley",
 resave: false,
 saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));

// Mongoose config
mongoose.connect('mongodb://localhost/authDB', { useNewUrlParser: true, useUnifiedTopology: true });

// middleware
const isLoggedIn = (req, res, next) => {
 if (req.isAuthenticated()) {
  return next()
 }
 res.redirect("/login")
}

// ROUTES
app.get('/', (req, res) => {
 res.render("register")
})

app.get("/secret", isLoggedIn, (req, res) => {
 res.render("secret")
})

// AUTH ROUTES

// REGISTER
app.post("/register", (req, res) => {
 req.body.username
 req.body.password
 User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
  if (err) {
   console.log(err)
   res.redirect("register")
  }
  passport.authenticate("local")(req, res, () => {
   res.redirect("secret")
  })
 })
})

// LOGIN
app.get("/login", (req, res) => {
 res.render("login")
})

app.post("/login", passport.authenticate("local", {
 successRedirect: "/secret",
 failureRedirect: "/login"
}), (req, res) => { })

// LOGOUT
app.get("/logout", (req, res) => {
 req.logOut()
 res.redirect("/")
})

app.listen(port, () => {
 console.log(`Example app listening at http://localhost:${port}`)
})