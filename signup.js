// var selectedFile;

// $("#file").on("change", function (event) {
//     selectedFile = event.target.files[0];
//     $("#uploadButton").show();
// });


function signup() {
    // $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var repassword = document.getElementById('repassword').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    if (password != repassword) {
        alert('Please enter a password.');
        return;
    }
    // Create user with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // removeLoader();
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
            return;
        }
        console.log(error);
        // [END_EXCLUDE]
    });

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            // User is signed in.
            var user = firebase.auth().currentUser;
            var uid;

            if (user != null) {

                uid = user.uid;
                alert(uid);
                saveInfo(uid);
                alert("User successfully created");
            }
            else {
                alert("Identificaion Error!");
                window.location.reload();
            }
        } else {
            // No user is signed in.
        }
    });
    // saveData();

    window.location.href = 'login.html';
}


function saveData(uid) {
    alert('test1');
    // var provider = new firebase.auth.GoogleAuthProvider();
    var user = uid;

    // alert('test2');

    alert('test2');
    var storageRef = firebase.storage().ref();
    // Create the file metadata
    var metadata = {
        contentType: 'image/jpeg'
    };
    // Create a name reference
    alert('Uploading image');

    var d = new Date();
    var postKey = d.getTime();
    alert('test3');
    // Upload file and metadata to the object
    var uploadTask = storageRef.child('Profile/' + postKey).put(selectedFile, metadata);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    alert('test4');
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // See below for more detail

        }, function (error) {
            // removeLoader();
            alert('Ralat!');
            // Handle unsuccessful uploads
        }, function () {
            // Handle successful uploads on complete
            alert('Image Upload!');
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {

                saveInfo(user, downloadURL);
            });

            // For instance, get the download URL: https://firebasestorage.googleapis.com/...

        });
}

function saveInfo(user) {

    var uid = user;
    var sName = document.getElementById('name').value;
    var sLocation = document.getElementById('location').value;
    var sEmail = document.getElementById('email').value;
    var sPhone = document.getElementById('phoneNumber').value;
    var downloadURL = '';

    var postData = {
        profileID: uid,
        profileName: sName,
        profileEmail: sEmail,
        profileLocation: sLocation,
        profilePhone: sPhone,
        profileURL: downloadURL,
    };

    var updates = {};
    updates['Profile/' + uid] = postData;
    var databaseRef = firebase.database().ref().update(updates);

    // removeLoader();
    alert('Data added!');
    balikC();
}

// function removeLoader() {
//     $("#loadingDiv").fadeOut(500, function () {
//         // fadeOut complete. Remove the loading div
//         $("#loadingDiv").remove(); //makes page more lightweight 
//     });
// }