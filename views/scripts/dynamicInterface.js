// const { map } = require("async");

function pageTitle(pageName) {
  var displayText;
  if (pageName == "compose") {
    displayText = "Composing";
  }
  var component = [
    "<td>",
    '<div class="btn input-group border-bottom btn-block c2Title">',
    "<h5>" + displayText + "</h5>",
    "</div>",
    "</td>",
  ].join("");
  return component;
}

function emailField(name) {
  var modalData;
  if (name == "To") {
    modalData = modalTo();
  } else if (name == "From") {
    modalData = modalFrom();
  } else if (name == "Subject") {
    modalData = modalSub();
  } else if (name == "Body") {
    modalData = modalBody();
  }
  if (name == "To" || name == "From" || name == "Cc") {
    var component = [
      '<div class="input-group email-field">',
      '<button class="space btn" for="email" data-toggle="modal" data-target="#toHelp">' +
        name +
        "</button>",
      modalData,
      '<input list="addresses" type="text" name="email' +
        name +
        '" id="email' +
        name +
        '"class="form-control">',
      '<datalist id="addresses">',
      '<option value="Terence Goldsmith (Terence.Goldsmith@smu.ca)">',
      '<option value="Terry (Terry@humanisticsystems.ca)">',
      '<option value="Charli (Charli@autismns.ca)">',
      '<option value="Chrystal (Chrystal@autismns.ca)">',
      "</datalist>",
      "</div>",
    ].join("");
  } else if (name == "Subject") {
    var component = [
      '<div class="input-group email-field">',
      '<button class="space btn" data-toggle="modal" data-target="#toHelp">' +
        name +
        "</button>",
      modalData,
      '<input type="text" name="subject" id="subject" class="form-control" placeholder="Add a subject">',
      "</div>",
    ].join("");
  } else if (name == "Body") {
    var component = [
      '<div class="input-group email-field">',
      '<label class="space">' +
        '<button class="space btn" data-toggle="modal" data-target="#toHelp">' +
        name +
        "</button></label>",
      modalData,
      "<!-- field to enter the content-->",
      '<textarea class="textArea" rows="10" name="text" id="text"></textarea>',
      "</div>",
    ].join("");
  }
  return component;
}

function showButtons() {
  var component = [
    "<br>",
    // Send button for Sending the email - activates modal for checking if everything is right.
    '<button data-role="button" class="btn btn-primary btn-compose" data-toggle="modal" data-target="#confirmSend">Send</button>',

    confirmSend(),

    // <!-- cancel button - goes to cancel() function when clicked -->
    '<button data-role="button" class="btn btn-primary btn-compose" onclick="cancel()">Discard</button>',

    // help button - goes to help() function when clicked
    '<button data-role="button" class="btn btn-primary btn-compose" data-toggle="modal" data-target="#emailhelp">',
    "Example</button>",
  ].join("");
  return component;
}

function confirmSend() {
  var component = [
    // Modal
    '<div id="confirmSend" class="modal fade" role="dialog">',
    '<div class="modal-dialog modal-lg">',
    // Modal content
    '<div class="modal-content">',
    '<div class="modal-header">',
    '<h4 class="modal-title">Is everything correct?</h4>',
    '<button type="button" class="close" data-dismiss="modal">&times;</button>',
    "</div>",
    '<div class="modal-body">',
    '<b>Click the check box if you answer to the question is "Yes".</b><br>',
    '<ul style="list-style-type:none;">',
    "<li>",
    '<label class="checkbox"><input type="checkbox" id="check1"></label>',
    "Did you write the email of the reciever in the To Field?<br>",
    "</li>",
    "<li>",
    '<label class="checkbox"><input type="checkbox" id="check2"></label>',
    '<span class="question"> Did you write the Subject of the Email in the Subject Field?</span><br>',
    "</li>",
    "<li>",
    '<label class="checkbox"><input type="checkbox" id="check3"></label>',
    "Did you greet the reciever in the beginning of the email?<br>",
    "</li>",
    "<li>",
    '<label class="checkbox"><input type="checkbox" id="check4"></label>',
    "Did you write the body of the email?<br>",
    "</li>",
    "<li>",
    '<label class="checkbox"><input type="checkbox" id="check5"></label>',
    "Did you sign your name at the end of the email?<br><br>",
    "</li>",
    "</ul>",
    "</div>",
    '<div class="modal-footer">',
    '<button type="submit" class="btn btn-default btn-success sendBtn" form="sendForm">Confirm and Send</button>',
    "<script>",
    "$(function() {",
    '$("#check1, #check2, #check3, #check4, #check5").on("change", function() {',
    '$(".sendBtn").prop("disabled", $(":checkbox:checked").length > 0);',
    "});",
    "});",
    "</script>",
    '<button type="button" class="btn btn-default btn-success" data-dismiss="modal">Go back and Check</button>',
    "</div>",
    "</div>",
    "</div>",
    "</div>",
  ].join("");

  return component;
}

function allChecked() {
  var check1 = $("#check1").val();
  var check2 = $("#check2").val();
  var check3 = $("#check3").val();
  var check4 = $("#check4").val();
  var check5 = $("#check5").val();

  alert(check1 && check2 && check3 && check4 && check5);
  return check1 && check2 && check3 && check4 && check5;
}

function modalTo() {
  var component = [
    // Modal
    '<div id="toHelp" class="modal fade" role="dialog">',
    '<div class="modal-dialog">',
    // Modal content
    '<div class="modal-content">',
    '<div class="modal-header">',
    '<h4 class="modal-title">Need help?</h4>',
    '<button type="button" class="close" data-dismiss="modal">&times;</button>',
    "</div>",
    '<div class="modal-body">',
    "<b>Who do you want to send the email to?</b> <br>",
    'Write the email address of the person whom you want to send this email to in the box beside "To".<br>',
    "<br><b>Some examples of email addresses</b><br>",
    "<ul>",
    "<li>abraham.lincoln@gmail.com</li>",
    "<li>justin_trudeau@yahoo.com</li>",
    "<li>alberteinstein21@hotmail.com</li>",
    "</ul>",
    "</div>",
    '<div class="modal-footer">',
    '<button type="button" class="btn btn-default btn-success" data-dismiss="modal">Close</button>',
    "</div>",
    "</div>",
    "</div>",
    "</div>",
  ].join("");
  return component;
}

function modalFrom() {
  var fromModal = [
    // Modal
    '<div id="fromHelp" class="modal fade" role="dialog">',
    '<div class="modal-dialog">',
    // Modal content
    '<div class="modal-content">',
    '<div class="modal-header">',
    '<h4 class="modal-title">Login or Registration Help</h4>',
    '<button type="button" class="close" data-dismiss="modal">&times;</button>',
    "</div>",
    '<div class="modal-body">',
    // PUT TO MODAL CONTENT HERE
    "</div>",
    '<div class="modal-footer">',
    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
    "</div>",
    "</div>",
    "</div>",
    "</div>",
  ].join("");
  return fromModal;
}

function modalSub() {
  var subModal = [
    // Modal
    '<div id="fromHelp" class="modal fade" role="dialog">',
    '<div class="modal-dialog">',
    // Modal content
    '<div class="modal-content">',
    '<div class="modal-header">',
    '<h4 class="modal-title">Login or Registration Help</h4>',
    '<button type="button" class="close" data-dismiss="modal">&times;</button>',
    "</div>",
    '<div class="modal-body">',
    // PUT TO MODAL CONTENT HERE
    "</div>",
    '<div class="modal-footer">',
    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
    "</div>",
    "</div>",
    "</div>",
    "</div>",
  ].join("");
  return subModal;
}

function modalBody() {
  var bodyModal = [
    // Modal
    '<div id="fromHelp" class="modal fade" role="dialog">',
    '<div class="modal-dialog">',
    // Modal content
    '<div class="modal-content">',
    '<div class="modal-header">',
    '<h4 class="modal-title">Login or Registration Help</h4>',
    '<button type="button" class="close" data-dismiss="modal">&times;</button>',
    "</div>",
    '<div class="modal-body">',
    // PUT TO MODAL CONTENT HERE
    "</div>",
    '<div class="modal-footer">',
    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
    "</div>",
    "</div>",
    "</div>",
    "</div>",
  ].join("");
  return bodyModal;
}

function modalExample() {
  var exampleModal = [
    // Modal
    '<div id="fromHelp" class="modal fade" role="dialog">',
    '<div class="modal-dialog">',
    // Modal content
    '<div class="modal-content">',
    '<div class="modal-header">',
    '<h4 class="modal-title">Login or Registration Help</h4>',
    '<button type="button" class="close" data-dismiss="modal">&times;</button>',
    "</div>",
    '<div class="modal-body">',
    // PUT TO MODAL CONTENT HERE
    "</div>",
    '<div class="modal-footer">',
    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
    "</div>",
    "</div>",
    "</div>",
    "</div>",
  ].join("");
  return exampleModal;
}

function viewEmail(source, email, i) {
  var modalData;
  if (userName == "To") {
    modalData = modalTo();
  } else if (userName == "From") {
    modalData = modalFrom();
  } else if (userName == "Subject") {
    modalData = modalSub();
  } else if (userName == "Body") {
    modalData = modalBody();
  }
  if (userName == "To" || userName == "From" || userName == "Cc") {
    var component = [
      '<div class="input-group email-field">',
      '<button class="space btn" for="email" data-toggle="modal" data-target="#toHelp">' +
        userName +
        "</button>",
      modalData,
      '<input list="addresses" type="text" name="email' +
        userName +
        '" id="email' +
        userName +
        '"class="form-control">',
      '<datalist id="addresses">',
      '<option value="Terence Goldsmith (Terence.Goldsmith@smu.ca)">',
      '<option value="Terry (Terry@humanisticsystems.ca)">',
      '<option value="Charli (Charli@autismns.ca)">',
      '<option value="Chrystal (Chrystal@autismns.ca)">',
      "</datalist>",
      "</div>",
    ].join("");
  } else if (userName == "Subject") {
    var component = [
      '<div class="input-group email-field">',
      '<button class="space btn" data-toggle="modal" data-target="#toHelp">' +
        userName +
        "</button>",
      modalData,
      '<input type="text" name="subject" id="subject" class="form-control" placeholder="Add a subject">',
      "</div>",
    ].join("");
  } else if (userName == "Body") {
    var component = [
      '<div class="input-group email-field">',
      '<label class="space">' +
        '<button class="space btn" data-toggle="modal" data-target="#toHelp">' +
        userName +
        "</button></label>",
      modalData,
      "<!-- field to enter the content-->",
      '<textarea class="textArea" rows="10" name="text" id="text"></textarea>',
      "</div>",
    ].join("");
  }
  return component;
}

function viewEmailField(email, name) {
  var modalData;
  var data;
  if (name == "To") {
    modalData = modalTo();
    data = email.to;
  } else if (name == "Cc") {
    modalData = modalCc();
    data = email.cc;
  } else if (name == "From") {
    modalData = modalFrom();
    data = email.from;
  } else if (name == "Subject") {
    modalData = modalSub();
    data = email.sub;
  } else if (name == "Body") {
    modalData = modalBody();
    data = email.text;
  }
  if (name == "From" || name == "Cc") {
    var component = [
      '<div class="input-group email-field">',
      '<button class="space btn" for="email" data-toggle="modal" data-target="#toHelp">' +
        name +
        "</button>",
      modalData,
      '<div class="form-control">',
      data,
      "</div>",
      "</div>",
    ].join("");
  } else if (name == "Subject") {
    var component = [
      '<div class="input-group email-field">',
      '<button class="space btn" data-toggle="modal" data-target="#toHelp">' +
        name +
        "</button>",
      modalData,
      '<div class="form-control">',
      data,
      "</div>",
      "</div>",
    ].join("");
  } else if (name == "Body") {
    var component = [
      '<div class="input-group email-field">',
      '<label class="space">' +
        '<button class="space btn" data-toggle="modal" data-target="#toHelp">' +
        name +
        "</button></label>",
      modalData,
      // "<!-- field to enter the content-->",
      '<div class="form-control">',
      data,
      "</div>",
      "</div>",
    ].join("");
  }
  return component;
}
