function login() {

  // [START signout]
  firebase.auth().signOut();
  // [END signout]

  var userEmail = document.getElementById("emailI").value;
  var userPass = document.getElementById("passwordI").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
    // Handle Errors here.

    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }

    // ...
  });
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;
      var uid;

      if (user != null) {

        uid = user.uid;
        localStorage["Uid"] = uid;
        // check_user(uid);
        // alert(uid);
        alert("Welcome!");
        window.location.href = 'profile.html';

      }
      else {
        alert("Identificaion Error!");
        //window.location.reload();
      }

    } else {
      // No user is signed in.
    }
  });

}

function logout() {

  localStorage["Uid"] = null;
  user = null;
  firebase.auth().signOut();
  window.location.href = 'index.html';
}