/*
 * This javascript file authenticates the user in the login page. It allows access
 * to the registered users.
 * Group 5
 * Nabin Bhandari (A00430201)
 * Sudeep Raj Badal (A00431008)
 * Aditya Choudhary (A00424677)
 * Rajan Poudel (A00426234)
 * Samuel Richard (A00430643)
 * Dinesh Kumar (A00432295)
 */

// Importing passport-local for strategy.
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Importing User model.
const User = require("../models/User");

// Exporting data after authentication.
module.exports = function (passport) {
  // Creating and using new passport strategy.
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Checking if the user is registered or not.
      User.findOne({
        email: email,
      }).then((user) => {
        // Displaying error message if the user is not registered.
        if (!user) {
          return done(null, false, {
            message: "That email is not registered. Please register first.",
          });
        }

        // Checking if the password matches or not when user exists.
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          // Authentication complete if password matches.
          if (isMatch) {
            return done(null, user);
          } else {
            // Displaying error message if the password is incorrect.
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );

  // Storing the data of the user in the session.
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // Retreving the data stored in sessor after authentication.
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
