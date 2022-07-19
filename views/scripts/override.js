// URL of the server
var SERVER_URL = "http://140.184.230.209:3049";

// object "user" to hold the data from the "user". User can be either admin or student.
var user = {
  name: "", // Name of the user
  email: "", // email address of the user
  password: "", // Password
  status: "", // status of the User : Either Student or Admin
  inbox: [], // inbox of the user
  sent: [], // outbox of the user
  drafts: [], // drafts folder of the user
  contacts: [], // contacts of the user
  "date ": "", // date of the user's registration
};

// Object "reciever" to hold the data from the "reciever". Reciever can be either student or admin depending
// on who the "user" is.
var reciever = {
  email: "admin.counselor@autismns.ca", // reciever's email address
  inbox: [], // reciever's inbox
};

// Maximum capacity of a folder in the email system for a user
const MAX_CAPACITY = 35;

// The number of emails that can be listed at a time in inbox/Sent Items etc.
const DISPLAY_CAPACITY = 7;

/*
 * DESCRIPTION : This function initiates upon the load of page. Always initiates inbox upon page refresh
 */
function begin() {
  var source;
  $.post("/users/getEmails", user, callbackFunction).fail(errorCallback);

  function callbackFunction(data) {
    localStorage.setItem("userStatus", data.status);
    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", data.email);
    console.log(data.name + " : " + data.status + " : " + data.email);
  }
  // goes to showInbox() when the user first logs in the eSystem.
  if (localStorage.getItem("col2") == null) {
    localStorage.setItem("col2", "Inbox");
    source = "Inbox";
  } else {
    source = localStorage.getItem("col2");
  }
  show(source);
}

/*
 * @Author: Sudeep Raj Badal
 * @A_Number: A00431008
 *
 */
function show(source) {
  localStorage.removeItem("col2");
  localStorage.setItem("col2", source);
  email(source, function (data) {
    $("#emailList").html(emailElement(source, data));
  });
}

function email(source, fn) {
  $.post("/users/getEmails", user, callBackFunction).fail(errorCallback);

  function callBackFunction(data) {
    fn(data);
  }
}

/*
 * @author : Sudeep Raj Badal
 * @A_Number : A00431008
 * DESCRIPTION: This function dynamically displayes the appropriate list of emails in column 2 of the user interface.
 *
 * param @source is the name of array from which emails are to be extracted. For example Inbox or Sent Items.
 */
function emailElement(source, data) {
  var emails = [];
  if (source == "Inbox") {
    data.inbox.map((item) => {
      var temp = {
        from: item.from,
        cc: item.cc,
        sub: item.sub,
        text: item.text,
        isRead: item.isRead,
        isFavorite: item.isFavorite,
      };
      emails.push(temp);
    });
  } else if (source == "Favorites") {
    data.inbox.map((item) => {
      // if (item.isFavorite) {
      var temp = {
        from: item.from,
        cc: item.cc,
        sub: item.sub,
        text: item.text,
        isRead: item.isRead,
        isFavorite: item.isFavorite,
      };
      emails.push(temp);

      // function showFavourite(emails) {}
    });
  } else if (source == "Sent Items") {
    data.sentItems.map((item) => {
      var temp = {
        from: item.from,
        cc: item.cc,
        sub: item.sub,
        text: item.text,
      };
      emails.push(temp);
    });
  } else if (source == "Drafts") {
    data.drafts.map((item) => {
      var temp = {
        from: item.from,
        cc: item.cc,
        sub: item.sub,
        text: item.text,
      };
      emails.push(temp);
    });
  } else {
    console.log("Source is not valid !!!");
  }
  var listElements =
    '<div class="btn input-group border-bottom btn-block c2Title">' +
    "<h5>" +
    source +
    "</h5>" +
    '</div><div style="Overflow-y:scroll;height:450px;width:100%overflow:auto">';

  // loop
  // for updating the string listElements with emails from the array.
  emails.reverse();
  if (source != "Favorites") {
    var i = emails.length - 1;
    for (const [key, value] of Object.entries(emails)) {
      listElements +=
        '<div class="listElement">' +
        '<span class="icon" onclick="changeFav(' +
        i +
        ')"><i class="fa fa-star ' +
        (value.isFavorite ? "checked" : "") +
        '"></i></span>' +
        '<label class="element border-bottom ' +
        (value.isRead ? "" : "unread") +
        '" onclick="showCompose(\'' +
        source +
        "'," +
        value +
        "," +
        i +
        ')" data-role="controlgroup" data-type="horizontal">' +
        '<a data-role="button" class="from">' +
        value.from +
        "</a> <br>" +
        '<a data-role="button" class="subject">' +
        value.sub +
        "</a>" +
        "</label>" +
        '<span class="icon"><i class="fa fa-trash deletebtn" onclick="deleteEmail(\'' +
        source +
        "'," +
        i +
        ')"></i></span>' +
        "</div>";
      i--;
    }
  } else {
    var i = emails.length - 1;
    for (const [key, value] of Object.entries(emails)) {
      if (value.isFavorite) {
        listElements +=
          '<div class="listElement">' +
          '<span class="icon" onclick="changeFav(' +
          i +
          ')"><i class="fa fa-star ' +
          (value.isFavorite ? "checked" : "") +
          '"></i></span>' +
          '<label class="element border-bottom ' +
          (value.isRead ? "" : "unread") +
          '" onclick="viewEmail(\'' +
          source +
          "'," +
          value +
          "," +
          i +
          ')" data-role="controlgroup" data-type="horizontal">' +
          '<a data-role="button" class="from">' +
          value.from +
          "</a> <br>" +
          '<a data-role="button" class="subject">' +
          value.sub +
          "</a>" +
          "</label>" +
          '<span class="icon"><i class="fa fa-trash deletebtn" onclick="deleteEmail(\'' +
          source +
          "'," +
          i +
          ')"></i></span>' +
          "</div>";
      }
      i--;
    }
  }

  listElements += "</div>";
  // return listElements
  return listElements;
}

function checkStorage() {
  $.post("/getEmails", user, callbackFunction).fail(errorCallback);

  function callbackFunction(data) {
    var storage = data.sentItems.length;
    if (storage < WARNING_CAPACITY) {
      alert("You are good.");
      showCompose();
    } else if (storage >= WARNING_CAPACITY && storage < MAX_CAPACITY) {
      alert(
        "Your Sent Items Box is getting Full.\n Please delete some emails before it is full."
      );
      showCompose();
    } else {
      storage >= MAX_CAPACITY;
    }
    {
      alert(
        "Your Sent Items Box is Full. Please delete some emails before you can send another email !!!"
      );
    }
  }
}

function showCompose() {
  var isAdmin = localStorage.getItem("userStatus") == "Admin";
  var compString =
    // Structures the page as a table
    '<div class="compose-screen">' +
    // First Row for the title of the page
    '<div class="btn input-group border-bottom btn-block c2Title"><h5>Composing</h5></div>' +
    '<form id="sendForm" action="/users/sendEmail" method="POST">' +
    // header with information about the help buttons
    '<div class="input-group helpStatement" data-role="header" id="helpStatement"> ' +
    "Did you know clicking on To, Cc, Subject and body shows hints?</div>" +
    // Shows input field set for "To"
    "<div>" +
    emailField("To") +
    "</div>" +
    // Shows input field set for "To"
    (isAdmin ? "<div>" + emailField("From") + "</div>" : "") +
    "<div>" +
    emailField("Cc") +
    "<div>" +
    // Shows input field set for "To"
    "<div>" +
    emailField("Subject") +
    "</div>" +
    '<div class="input-group helpStatement" data-role="header" id="helpStatement"> ' +
    "Start your email with a proper greeting. Example: Dear Prof. Goldsmith" +
    "</div>" +
    // Shows input field set for "To"
    "<div>" +
    emailField("Body") +
    "</div>" +
    '<div class="input-group helpStatement" data-role="header" id="helpStatement"> ' +
    "Don't forget to sign your email in the conclusion." +
    "</div>" +
    // Shows the Send, Discard and Example buttons
    "<div>" +
    showButtons() +
    "</div>" +
    "</form>" +
    "</div><br>";
  $("#composeScreen").html(compString);
}

function viewEmail(email, source) {
  // getting the current user's status from the localStorage.
  var userStatus = localStorage.getItem("userStatus");

  // the divisions for different display fields for viewing email page
  var toField =
    '<div class="border-bottom">' + viewEmailField(email, "To") + "</div>";
  var fromField =
    '<div class="border-bottom">' +
    viewEmailviewEmailField(email, "From") +
    "</div>";
  var ccField =
    '<div class="border-bottom">' + viewEmailField(email, "Cc") + "</div>";
  var subjectField =
    '<div class="border-bottom">' + viewEmailField(email, "Subject") + "</div>";
  var bodyField =
    '<div class="border-bottom">' +
    viewEmailviewEmailField(email, "Body") +
    "</div>";

  // variable holding the html code for display when any email from col2 is clicked.
  var viewString =
    "" +
    // Structures the page as a table,
    '<div class="compose-screen">' +
    // First Row for the title of the page
    '<div class="btn input-group border-bottom btn-block c2Title"><h5>Viewing ' +
    source +
    " Email</h5></div>" +
    // header with information about the help buttons
    '<div class="input-group helpStatement" data-role="header" id="helpStatement"> ' +
    "Did you know clicking on To, Cc, Subject and body shows hints?</div>" +
    // Show toField for other pages than inbox
    (source == "Inbox" ? "" : toField) +
    // Show from field for inbox or if the user is an admin
    (source == "Inbox" || userStatus == "Admin" ? fromField : "") +
    // Show other fields for all pages and users
    ccField +
    subjectField +
    bodyField +
    "</div>";
  $("#composeScreen").html(viewString);
}

function sendEmail() {
  var email = {};
}

function changeFav(i) {
  $.post("/users/changeFav/" + i, user, callBackFunction2).fail(errorCallback);

  function callBackFunction2(data) {
    if (data.length > 0) {
      console.log("Succesfully Changed favourite preference!");
      location.reload();
    }
  }
}

function deleteEmail(source, i) {
  var folder = "";
  if (source == "Inbox" || source == "Favorites") {
    folder = "inbox";
  } else if (source == "sentItems") {
    folder = "sentItems";
  } else {
    folder = "drafts";
  }
  $.post("/users/deleteEmail/" + source + "/" + i, user, callBackFunction).fail(
    errorCallback
  );

  function callBackFunction(data) {
    if (data.length > 0) {
      console.log("Successfully Deleted the email from " + folder);
      location.reload();
    }
  }
}

/*
        funtion to catch callback error while saving the data in server.
    */
function errorCallback(err) {
  console.log(err.responseText);
}
