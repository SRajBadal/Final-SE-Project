/*
 * This page javascript if the user is authenticated or not. If the user is authenticated, then it lets the user
 * proceed to interface. Else, it will return an error message and return the user back to login screen.
 *
 * Group 5
 * Nabin Bhandari (A00430201)
 * Sudeep Raj Badal (A00431008)
 * Aditya Choudhary (A00424677)
 * Rajan Poudel (A00426234)
 * Samuel Richard (A00430643)
 * Dinesh Kumar (A00432295)
 */

// module.exports statement for exporting data from module
module.exports = {
  // Function to check if the user is authenticated or not.
  ensureAuthenticated: function (req, res, next) {
    // If the user is authenticated, send to next function.
    if (req.isAuthenticated()) {
      return next();
    }
    // Display message if the user is not logged in.
    req.flash(
      "error_msg",
      "You are not currently logged in. Please login using your email and password to view the page."
    );
    // Redirect the user to the login page.
    res.redirect("/users/login");
  },

  // Function to forward the user if authenticated.
  forwardAuthenticated: function (req, res, next) {
    // If the user is not authenticated, go back to authenticate.
    if (!req.isAuthenticated()) {
      return next();
    }
    // Redirect the user to interface page if successfully authenticated.
    res.redirect("/interface");
  },
};
