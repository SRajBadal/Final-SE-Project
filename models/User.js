/*
 * This java-script page that contains the data of every user in the database.
 *
 * Group 5
 * Sudeep Raj Badal (A00431008)
 * Nabin Bhandari (A00430201)
 * Aditya Choudhary (A00424677)
 * Rajan Poudel (A00426234)
 * Samuel Richard (A00430643)
 * Dinesh Kumar (A00432295)
 */

// Declaring a class representation of the BSON Timestamp type.
const { Timestamp } = require("bson");

// Declaring and importing mongoose.
const mongoose = require("mongoose");

// Declaring new structure for the users in an interface to the database with its required variables.
const UserSchema = new mongoose.Schema({
  // Storing the name of the user in json format.
  name: {
    type: String,
    required: true,
  },

  // Storing the email of the user in json format.
  email: {
    type: String,
    required: true,
  },

  // Storing the password of the user in json format.
  password: {
    type: String,
    required: true,
  },

  // Storing the status of the user in json format.
  status: {
    type: String,
    default: "Student",
  },
  // Storing the components of inbox of the user in json format.
  inbox: [
    {
      from: { type: String },
      cc: { type: String },
      sub: { type: String },
      text: { type: String },
      isRead: { type: Boolean, default: false },
      isFavorite: { type: Boolean, default: false },
      date: { type: Date, default: Date.now },
    },
  ],
  // Storing the components of sent-items of the user in json format.
  sentItems: [
    {
      to: { type: String },
      from: { type: String },
      cc: { type: String },
      sub: { type: String },
      text: { type: String },
      date: { type: Date },
    },
  ],
  // Storing the components of drafts of the user in json format.
  drafts: [
    {
      to: { type: String },
      from: { type: String },
      cc: { type: String },
      sub: { type: String },
      text: { type: String },
      date: { type: Date },
    },
  ],
  // Storing the  contacts in json format in json format.
  contacts: {
    type: Array,
    default: ["admin.counselor@autismns.ca"],
  },
  // Storing the date in json format.
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating a user model.
const User = mongoose.model("User", UserSchema);

// Exporting the user.
module.exports = User;
