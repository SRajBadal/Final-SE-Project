var express = require("express");
var expressLayouts = require("express-ejs-layouts");
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var session = require("express-session");

var server = express();

// Passport Config
require("./config/passport")(passport);

// DB Config
var db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

// Use of expressLayouts for using .ejs files in the project
server.use(expressLayouts);
// sets the view engine to ejs
server.set("view engine", "ejs");

// Express body parser
server.use(express.urlencoded({ extended: true }));

// Express session
server.use(
    session({ secret: "secret", resave: true, saveUninitialized: true })
);

// Passport middleware
server.use(passport.initialize()); // Initializes the Passport authentication middleware
server.use(passport.session()); // Starts the session on Passport

// Connects flash for sending values to redirected requests
server.use(flash());

// Global variables
server.use(function(req, res, next) {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

// Routes
server.use("/", require("./routes/index.js"));
server.use("/users", require("./routes/users.js"));

// Creating links for server to use static assets like javascript and css
server.use("/css", express.static(__dirname + "/views/css"));
server.use("/scripts", express.static(__dirname + "/views/scripts"));
server.use("/images", express.static(__dirname + "/views/images"));
server.use("/icons", express.static(__dirname + "/views/icons"));
server.use("/bootstrap-icons-1.1.0", express.static(__dirname + "/bootstrap-icons-1.1.0"));
server.use("/icons-1.1.0", express.static(__dirname + "/icons-1.1.0"));
// root
server.use(express.static(__dirname));

// Setting port as 3000. Server will run on port 3000
var PORT = 3000;

server.listen(PORT, console.log('Server is listening on port ' + PORT));