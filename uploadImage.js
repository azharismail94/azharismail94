var provider = new firebase.auth.GoogleAuthProvider();
var user;
var selectedFile;

$("#file").on("change", function(event) {
	selectedFile = event.target.files[0];
	$("#uploadButton").show();
});

function uploadFile() {
	alert('test 1');

	// Create a root reference
	var storageRef = firebase.storage().ref();
	alert('test 2');
	// Create the file metadata
	var metadata = {
		contentType: 'image/jpeg'
	};
	alert('test 3');
	// Create a name reference
	alert('Uploading image');
	var d = new Date();
	var postKey = d.getTime();
	// final StorageReference storageReference2nd = storageReference.child(System.currentTimeMillis() + "." + GetFileExtension(FilePathUri));

	// Upload file and metadata to the object

	// var storageRef = firebase.storage().ref('/All_Image_Uploads/' + postKey);
	// var uploadTask = storageRef.put(selectedFile);

	alert('test 4');
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

// function uplaadImage() {
// 	alert('pressed');
// 	const ref = firebase.storage().ref();
// 	const file = $('#ifile').get(0).files[0];
// 	var d = new Date();
// 	// var postKey = d.getTime();
// 	const name = d.getTime();
// 	const metadata = { contentType: 'image/jpeg' };
// 	const task = ref.child(name).put(file, metadata);
// 	task
// 		.then(snapshot => snapshot.ref.getDownloadURL())
// 		.then((url) => {
// 			// console.log(url);
// 			// document.querySelector('#someImageTagID').src = url;
// 			saveInfo(name, url);
// 		})
// 		.catch(console.error);
// }

function saveInfo(postKey, downloadURL) {
	//var postKey = firebase.database().ref('posterD/').push().key;
	var user = firebase.auth().currentUser;
	var uid = user.uid;
	var d = new Date();
	var sTime = d.getTime();
	var sImageID = firebase.database().ref('user_upload/' + uid).push().key;
	var sName = document.getElementById('pName').value;
	var sCategory = document.getElementById('pCategory').value;
	var sCaption = document.getElementById('pCaption').value;
	var sDate = document.getElementById('pDate').value;
	var sPrivacy = document.getElementById('pPriacy').value;

	var postData = {
		imageName : sName,
		imageURL : downloadURL,
		imageID : sImageID,
		imageCategory : sCategory,
		imageCaption : sCaption,
		imageDate : sDate,
		iTime : sTime,
		imagePrivacy : sPrivacy,
	};

	if (sPrivacy == 'Public') {

		var updates = {};
		updates['user_upload/' + uid + sImageID] = postData;
		var databaseRef = firebase.database().ref().update(updates);

		var updates2 = {};
		updates2['all_image/' + sImageID] = postData;
		var databaseRef = firebase.database().ref().update(updates2);

	}
	else {

		var updates = {};
		updates['user_upload/' + sImageID] = postData;
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
