var childVal = null;
var exists;
var keyVal = null;
var lastNo = lastNum();
var firebaseConfig = {
  apiKey: "AIzaSyBFo7mBVgXTNmuKFI9ZDQ_yh64XKjEMAeA",
  authDomain: "cryptrix-2k19.firebaseapp.com",
  databaseURL: "https://cryptrix-2k19.firebaseio.com",
  projectId: "cryptrix-2k19",
  storageBucket: "cryptrix-2k19.appspot.com",
  messagingSenderId: "1032074784863",
  appId: "1:1032074784863:web:b1866501f96a498b"
};
firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref("RegisteredUsers");

document.getElementById("alvissubmit").addEventListener("submit", saveMessage);

function getInputVal(id) {
  return document.getElementById(id).value;
}

function loadMessage(
  alviscollege,
  alvisemail,
  alvisgender,
  alvisregno,
  alvisphone,
  alvisname,
  alvisfood
) {
  var newMessageRef = messagesRef.child("CRX" + childVal + lastNo);
  newMessageRef.set({
    c: alviscollege,
    e: alvisemail,
    g: alvisgender,
    b: "cryptrix",
    id: "CRX" + childVal + lastNo,
    n: alvisregno,
    p: alvisphone,
    r: "1" === "1",
    u: alvisname,
    v: alvisfood
  });

  creDit();
  // serverReq();
  rDone();
}

function serverReq() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // document.getElementById("demo").innerHTML = this.responseText;
      console.log("works");
    }
  };
  xhttp.open("POST", "demo_post.asp", true);
  xhttp.send();
}
function delTop() {
  var ref = firebase.database().ref("unqId");
  ref.child(keyVal).remove();
  // console.log(keyVal);
}
function loadd(
  alviscollege,
  alvisemail,
  alvisgender,
  alvisregno,
  alvisphone,
  alvisname,
  alvisfood
) {
  stackTop();

  while (childVal != null) {
    // checkIfUserExists("CRX" + childVal);

    if (!exists) {
      loadMessage(
        alviscollege,
        alvisemail,
        alvisgender,
        alvisregno,
        alvisphone,
        alvisname,
        alvisfood
      );
      delTop();
    } else {
      loadd();
    }
    break;
  }
}
var phnnn;
function saveMessage(e) {
  e.preventDefault();

  var alviscollege = getInputVal("college");
  var alvisemail = getInputVal("email");
  var alvisgender = getInputVal("sex");
  var alvisregno = getInputVal("regno");
  var alvisphone = getInputVal("phone");
  var phnnn = getInputVal("phone");
  var alvisname = getInputVal("name");
  var alvisfood = "1" === getInputVal("food").toString();
  var usersRef = firebase.database().ref("RegisteredUsers");

  loadd(
    alviscollege,
    alvisemail,
    alvisgender,
    alvisregno,
    alvisphone,
    alvisname,
    alvisfood
  );
  //     var ref = firebase.database().ref('unqId');
  //     ref.orderByValue().limitToFirst(1).once("value", function(snapshot) {
  //       console.log(ref.child("unqId"));
  //       // snapshot.remove();
  //       // console.log(snapshot.val());
  //    }, function (error) {
  //       console.log("Error: " + error.code);
  //    });
}

function saveVal(hah, lol) {
  childVal = hah;
  keyVal = lol;
}
function stackTop() {
  var ref = firebase.database().ref("unqId");
  ref
    .orderByValue()
    .limitToFirst(1)
    .once(
      "value",
      function(snapshot) {
        snapshot.forEach(function(child) {
          saveVal(child.val().toString(), child.key);
        });

        //   console.log(snapshot.child.val());
      },
      function(error) {
        console.log("Error: " + error.code);
      }
    );
}

function creDit() {
  console.log("made by Alvis.F");
  console.log("made by Daniel D");
  console.log("made by Dennis.F");
}

function rDone() {
  $(document).ready(function() {
    $("#alvisdis").html(
      '<h1><br><center>SUCCESSFULLY REGISTERED!</center></h1>\n<h1><br><center>THANK YOU FOR REGISTERING!</center></h1>\n<h1 style="font-size:5vw;">\n<br>\n<center>YOUR CRYPTRIX 2K19 ID IS:\n<span style="color: red">CRX' +
        childVal +
        lastNo +
        "</span>\n</center>\n</h1>\n<h1>\n<br>\n<center>PLEASE BRING THIS CRYPTRIX ID ON THE DAY OF THE SYMPOSIUM</center>\n</h1>\n<h1>\n<br>\n<center>A CONFIRMATION MAIL HAS BEEN SENT TO YOUR EMAIL ADDRESS</center>\n</h1>\n"
    );
  });
}

// function checkIfUserExists(userId) {
//   var usersRef = firebase.database().ref("RegisteredUsers");
//   usersRef.child(userId).once("value", function(snapshot) {
//     exists = snapshot.exists();
//     console.log(exists);
//   });
// }

function lastNum() {
  var min = 0;
  var max = 99;
  var random = Math.floor(Math.random() * (+max - +min)) + +min;
  return random;
}
