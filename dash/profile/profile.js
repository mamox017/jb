const disName = document.getElementById('disName');
const disEmail = document.getElementById('disEmail');
const disPhone = document.getElementById('disPhone');
const logOutBtn = document.getElementById('logOutBtn');
const updateInfo = document.getElementById('update');
const profilePic = document.getElementById('profpic');

var mainApp = {};

var currUser;
var box;
var phonebox;


(function(){
	var firebase = app_firebase;
	user = firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    currUser = user;
	    displayInfo();
	  } else {
	  	console.log("no user here...");
	  	window.location.replace("../../auth/login.html");
	  }
	  function logOut(){
		firebase.auth().signOut();
		console.log("signing out..");
		window.location.replace("../../index.html");
	  }
 
	  mainApp.logout = logOut;

	});
})()

logOutBtn.addEventListener('click', (event) => {
	console.log("logging out!");
	mainApp.logout();
});

function displayInfo() {

	disName.textContent = "Display Name: " + currUser.displayName;
  	disEmail.textContent = "Email: " + currUser.email;
  	if(currUser.photoURL == null){
  		disPhone.textContent = "Profile Picture URL: Not set";
  	} else {
  		disPhone.textContent = "Profile Picture URL: Set";
  		profpic.src = currUser.photoURL;
  	}
}

updateInfo.addEventListener('click', (event) => {
	if(updateInfo.textContent == "Update Information") {
		updateInfo.textContent = "Save Changes";
		const namefield = document.createElement('div');
		namefield.className = 'input-group mb-2';
		const label = document.createElement('div');
		label.className = 'input-group-prepend';
		const labelTxt = document.createElement('div');
		labelTxt.className = 'input-group-text';
		labelTxt.textContent = 'Name';
		box = document.createElement('input');
		box.className = 'form-control';
		box.value = currUser.displayName;
		label.appendChild(labelTxt);
		namefield.appendChild(label);
		namefield.appendChild(box);
		disName.parentNode.replaceChild(namefield, disName);

		const phonefield = document.createElement('div');
		phonefield.className = 'input-group mb-2';
		const phonelabel = document.createElement('div');
		phonelabel.className = 'input-group-prepend';
		const phonelabelTxt = document.createElement('div');
		phonelabelTxt.className = 'input-group-text';
		phonelabelTxt.textContent = 'Image URL';
		phonebox = document.createElement('input');
		phonebox.className = 'form-control';
		phonebox.placeholder = "image url e.g. https://i.imgur.com/img.png"
		phonelabel.appendChild(phonelabelTxt);
		phonefield.appendChild(phonelabel);
		phonefield.appendChild(phonebox);
		disPhone.parentNode.replaceChild(phonefield, disPhone);

	} else if (updateInfo.textContent == "Save Changes") {
		if (box.value != "") {
			console.log(box.value);
			currUser.updateProfile({
				displayName: box.value,
			});
		}
		if (phonebox.value != "") {
			console.log(phonebox.value);
			console.log(currUser.phoneNumber);
			currUser.updateProfile({
				photoURL: phonebox.value
			});
		}
		updateInfo.className = 'btn btn-success disabled';
		updateInfo.textContent = "Changes Saved ✔";
	}
});