var provider = new firebase.auth.GoogleAuthProvider();
var user;
var selectedFile;

$("#file").on("change", function (event) {
    selectedFile = event.target.files[0];
    $("#uploadButton").show();
});

function uploadFile2() {
    alert('test 1');

    // Create a root reference
    var storageRef = firebase.storage().ref();
    alert('test 2');
    // Create the file metadata
    var metadata = {
        contentType: 'image/jpeg'
    };
    // Create a name reference
    alert('Uploading image');

    var d = new Date();
    var postKey = d.getTime();
    alert('test 3');
    // var postKey = firebase.database().ref('posterD/').push().key;
    //var filename = selectedFile.name;

    // Upload file and metadata to the object
    var uploadTask = storageRef.child('All_Image_Uploads/' + postKey).put(selectedFile, metadata);
    alert('test 4');
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // See below for more detail

        }, function (error) {
            alert('Ralat!');
            // Handle unsuccessful uploads
        }, function () {
            // Handle successful uploads on complete
            alert('Image Upload!');
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {

                alert(downloadURL);
                alert('saveInfo');
                saveInfo(postKey, downloadURL);
            });

            // For instance, get the download URL: https://firebasestorage.googleapis.com/...

        });

}

function saveInfo(postKey, downloadURL) {
    alert('test 5');

    //var postKey = firebase.database().ref('posterD/').push().key;
    // var user = firebase.auth().currentUser;
    var uid = localStorage["Uid"];
    alert(uid);
    // var uid = user.uid;
    var d = new Date();
    alert(d);
    var sTime = d.getTime();
    alert(sTime);
    var sImageID = firebase.database().ref('user_upload/' + uid).push().key;
    alert(sImageID);
    var sName = document.getElementById('pName').value;
    alert(sName);
    var sCategory = document.getElementById('pCategory').value;
    alert(sCategory);
    var sCaption = document.getElementById('pCaption').value;
    alert(sCaption);
    var sDate = document.getElementById('pDate').value;
    alert(sDate);
    var sPrivacy = document.getElementById('pPrivacy').value;
    alert(sPrivacy);

    alert('test 6');

    var postData = {
        imageName: sName,
        imageURL: downloadURL,
        imageID: sImageID,
        imageCategory: sCategory,
        imageCaption: sCaption,
        imageDate: sDate,
        iTime: sTime,
        imagePrivacy: sPrivacy,
    };

    alert('test 7');


    if (sPrivacy == 'Public') {

        var updates = {};
        updates['user_upload/' + uid +'/'+ sImageID] = postData;
        var databaseRef = firebase.database().ref().update(updates);

        var updates2 = {};
        updates2['all_image/' + sImageID] = postData;
        var databaseRef = firebase.database().ref().update(updates2);

    }
    else {

        var updates = {};
        updates['user_upload/' + uid +'/'+ sImageID] = postData;
        var databaseRef = firebase.database().ref().update(updates);
    }

    alert('Data added!');
    balikC();
}

function balikC() {
    window.open("profile.html", "_self");
}

function reload_page() {
    window.location.reload();
}
