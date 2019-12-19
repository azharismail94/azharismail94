firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    var uid;

    if(user != null){

      uid = user.uid;
      localStorage["Uid"] = uid;
      // check_user(uid);
      // alert(uid);
      alert("Welcome!");
      window.location.href = 'profile.html';
      
    }
    else{
      alert("Identificaion Error!");
      window.location.reload();
    }

  } else {
    // No user is signed in.
  }
});

function check_user(uid){
  var dbLog = firebase.database().ref('log_in');

  var userid = uid;
  var userPosition;

  dbLog.once('value', function(snapshot){
  snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      var uidUSer = childData.UID;

      if(uidUSer == userid){
        userPosition  = childData.position;
        if(userPosition =='admin'){
          window.location.href = 'front.html';
        }
        else if(userPosition =='manager'){
          window.location.href = 'manager_front.html'
        }
        else{
          alert("User not found!")
          window.location.href = 'index.html'
        }

      }

    });
  });
}

function login(){

  var userEmail = document.getElementById("emailI").value;
  var userPass = document.getElementById("passwordI").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Ralat : " + errorMessage);

    // ...
  });

}

function logout(){
  
  localStorage["Uid"] = null;
  user = null;
  firebase.auth().signOut();
  window.location.href = 'index.html';
}
