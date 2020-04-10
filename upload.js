var provider = new firebase.auth.GoogleAuthProvider();
var user;
var selectedFile;

$("#file").on("change", function (event) {
	selectedFile = event.target.files[0];
	$("#uploadButton").show();
});

function uploadFile() {

	// Create a root reference
	var storageRef = firebase.storage().ref();

	// Create the file metadata
	var metadata = {
		contentType: 'image/jpeg'
	};
	// Create a name reference
	alert('Uploading image');
	var d = new Date();
	var postKey = d.getTime();
	// final StorageReference storageReference2nd = storageReference.child(System.currentTimeMillis() + "." + GetFileExtension(FilePathUri));

	// var postKey = firebase.database().ref('posterD/').push().key;
	//var filename = selectedFile.name;

	// Upload file and metadata to the object

	var uploadTask = storageRef.child('All_Image_Uploads/' + postKey).put(selectedFile, metadata);


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
			//alert('Image Upload!');
			// Upload completed successfully, now we can get the download URL
			uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {

				saveInfo(postKey, downloadURL);
			});

			// For instance, get the download URL: https://firebasestorage.googleapis.com/...

		});

}

function saveInfo(postKey, downloadURL) {
	//var postKey = firebase.database().ref('posterD/').push().key;

	var sName = document.getElementById('pName').value;
	var sCategory = document.getElementById('pCategory').value;
	var sCaption = document.getElementById('pCaption').value;
	var sDate = document.getElementById('pDate').value;
	var sPrivacy = document.getElementById('pPriacy').value;

	if (sPrivacy == 'Public') {
		var postData = {
			url: downloadURL,
			id: postKey,
			course: sCourse,
			date: sDate,
			duration: sDuration,
			time: sTime,
			price: sPrice,
			details: sDetails
		};
		var updates = {};
		updates['posterD/' + postKey] = postData;
		var databaseRef = firebase.database().ref().update(updates);

	}
	else {
		var postData = {
			url: downloadURL,
			id: postKey,
			course: sCourse,
			date: sDate,
			duration: sDuration,
			time: sTime,
			price: sPrice,
			details: sDetails
		};
		var updates = {};
		updates['posterD/' + postKey] = postData;
		var databaseRef = firebase.database().ref().update(updates);
	}

	alert('Data added!');
	balikC();
}

function balikC() {
	window.open("admin.html", "_self");
}

function reload_page() {
	window.location.reload();
}
