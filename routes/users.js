/*
 * This javascript is responsible for registering, logging-in, logging-out the user,
 * along with sending and receiving of the emails in all the pages.
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

// Importing express router.
var router = express.Router();

// Importing bcrypt.
var bcrypt = require("bcryptjs");

// Importing pasport.
var passport = require("passport");

// Importing user model.
var User = require("../models/User");

// Making sure the user is authenticated.
var { forwardAuthenticated } = require("../config/auth");

// Redirecting to login page for authentication
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

// Register
router.post("/register", (req, res) => {
  var { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        var newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered. Please log in."
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/interface",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

router.post("/getEmails", (req, res) => {
  User.findOne(req.user)
    .then((user) => {
      // Data is in variable "user"
      console.log("FOUND: " + user.email);
      res.status(200).send(user);
    })
    .catch((err) => console.log(err));
});

/**
 * Description: This is the post function which sends email to the inbox of the reciever and the sent items box
 * of the sender. The post function decides by itself if the user is an admin or a student and adjusts the email
 * accordingly. It also validates if the sender or reciever inbox and outbox are full or not.
 *
 * @Author: Sudeep Raj Badal
 */
router.post("/sendEmail", (req, res) => {
  // emailTo, emailFrom, emailCC, subject and text are brought from the compose form from request body
  var { emailTo, emailFrom, emailCc, subject, text } = req.body;

  // query object for fiending reciever in the database
  var reciever_Query = { email: emailTo };
  // sender
  var sender = [];
  // email to send if the student is sending the email
  var studentEmail = {
    from: "To be Updated", // initiator value... will be changed later in the function
    cc: emailCc,
    sub: subject,
    text: text,
    isRead: false,
    isFavorite: false,
  };
  // email to send if the admin is sending the email
  var adminEmail = {
    from: emailFrom,
    cc: emailCc,
    sub: subject,
    text: text,
    isRead: false,
    isFavorite: false,
  };
  // email to be saved in Sent Items Box
  var outboxEmail = {
    to: emailTo,
    from: emailFrom, // changed later if sender is student
    cc: emailCc,
    sub: subject,
    text: text,
  };

  User.findOne(req.user)
    .then((sender) => {
      User.findOne(reciever_Query)
        .then((reciever) => {
          if (sender.sentItems.length < 50 && reciever.inbox.length < 50) {
            if (sender.status === "student") {
              studentEmail.from = sender.email;
              outboxEmail.from = sender.email;
              sendEmail(sender, reciever, studentEmail, outboxEmail);
            } else {
              sendEmail(sender, reciever, adminEmail, outboxEmail);
            }
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

  function sendEmail(sender, reciever, email, outboxEmail) {
    User.findOne({ email: reciever.email })
      .then((user) => {
        User.findOneAndUpdate(
          { email: user.email },
          { $push: { inbox: email } }
        ).catch((err) => console.log(err));
        console.log("Sent to Inbox of " + reciever.email);
      })
      .catch((err) => console.log(err));

    User.findOne(req.user)
      .then((user) => {
        User.findOneAndUpdate(
          { email: user.email },
          { $push: { sentItems: outboxEmail } }
        ).catch((err) => console.log(err));
        console.log("Sent to Sent Items Box of " + user.email);
      })
      .catch((err) => console.log(err));
  }

  res.redirect("/interface");
});

// Saves the draft of the user
router.post("/saveDraft", (req, res) => {
  email = {};
  User.findOne(req.user)
    .then((user) => {
      if (user.status == "Student") {
        var { emailTo, emailCc, subject, text } = req.body;
        email = {
          to: emailTo,
          cc: emailCc,
          sub: subject,
          text: text,
        };
      } else {
        var { emailTo, emailFrom, emailCc, subject, text } = req.body;
        email = {
          to: emailTo,
          from: emailFrom,
          cc: emailCc,
          sub: subject,
          text: text,
        };
      }
      User.findOneAndUpdate(
        { email: user.email },
        { $push: { drafts: email } }
      ).catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post("/changeFav/:i", (req, res) => {
  var i = parseInt(req.params.i);
  User.findOne(req.user)
    .then((user) => {
      user.inbox[i].isFavorite = !user.inbox[i].isFavorite;
      user.save();
      console.log(
        user.inbox[i].isFavorite + " from " + !user.inbox[i].isFavorite
      );
    })
    .catch((err) => console.log(err));
  res.render("interface");
});

router.post("/deleteEmail/:folder/:index", (req, res) => {
  var folder = req.params.folder;
  var index = parseInt(req.params.index);
  console.log(folder + " : " + index);

  console.log(index + " : " + folder);
  User.findOne(req.user)
    .then((user) => {
      if (folder == "Inbox") {
        user.inbox.splice(index, 1);
        User.findOneAndUpdate({ email: user.email }, user).catch((err) =>
          console.log(err)
        );
      } else if (folder == "Sent Items") {
        user.sentItems.splice(index, 1);

        User.findOneAndUpdate({ email: user.email }, user).catch((err) =>
          console.log(err)
        );
      } else if (folder == "Drafts") {
        user.drafts.splice(index, 1);
        User.findOneAndUpdate({ email: user.email }, user).catch((err) =>
          console.log(err)
        );
      } else {
        console.log("Folder is not Valid!!");
      }
      // user.save();
      res.status(200).send("Successful");
    })
    .catch((err) => console.log(err));
});

module.exports = router;
