/*
 * This javascript file is responsible is responsible for redirecting the users to the
 * appropriate page.
 *
 * Group 5
 * Nabin Bhandari (A00430201)
 * Sudeep Raj Badal (A00431008)
 * Aditya Choudhary (A00424677)
 * Rajan Poudel (A00426234)
 * Samuel Richard (A00430643)
 * Dinesh Kumar (A00432295)
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
