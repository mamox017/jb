const disName = document.getElementById('disName');
const disEmail = document.getElementById('disEmail');
const disPhone = document.getElementById('disPhone');
const logOutBtn = document.getElementById('logOutBtn');

var mainApp = {};

(function(){
	var firebase = app_firebase;
	user = firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	  	disName.textContent = "Display Name: " + user.displayName;
	  	disEmail.textContent = "Email: " + user.email;
	  	disPhone.textContent = "Phone Number: " + user.phoneNumber;
	    uid = user.uid;
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
})