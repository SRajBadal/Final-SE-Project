/*
 * This javascript file is responsible is responsible for redirecting the users to the
 * appropriate page.
 *
 * Group 5
 * Nabin Bhandari
 * Sudeep Raj Badal
 * Aditya Choudhary
 * Rajan Poudel
 * Samuel Richard
 * Dinesh Kumar
 */

//  Importing express.
var express = require("express");

// Importing router.
var router = express.Router();
// Checking if the user is authenticated.
var { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Redirecting to login page if the user is not authenticated.
router.get("/", forwardAuthenticated, (req, res) => res.render("login"));

// Redirecting to interface page if authenticated.
router.get("/interface", ensureAuthenticated, (req, res) =>
  // Redirecting to the page whose credientials is authenticated.
  res.render("interface", {
    user: req.user,
  })
);
// Exporting the router.
module.exports = router;
