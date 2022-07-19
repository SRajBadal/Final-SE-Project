/*
 * This javascript file holds the credentials of the database and exports the
 * Group 5
 * Nabin Bhandari (A00430201)
 * Sudeep Raj Badal (A00431008)
 * Aditya Choudhary (A00424677)
 * Rajan Poudel (A00426234)
 * Samuel Richard (A00430643)
 * Dinesh Kumar (A00432295)
 */

// var username = "group5"; // username
// var password = "norway@spell@21"; // password
// var localHost = "127.0.0.1"; // Address of the local host. mongoDB must use the local host.
// var localPort = "27017"; // port number of the local port
// var database = "group5"; // name of database

// // URL for mongo Database
// var credentialsString =
//     "mongodb://" +
//     username +
//     ":" +
//     password +
//     "@" +
//     localHost +
//     ":" +
//     localPort +
//     "/" +
//     database;

// Variable to hold the credentials.
var credentialsString =
  "mongodb+srv://group5:software@cluster0.rlpqt.mongodb.net/group5?retryWrites=true&w=majority";

// Exporting the crediential string
module.exports = {
  mongoURI: credentialsString,
};
