const welcome = document.getElementById('welcome');
const logOutBtn = document.getElementById('logOutBtn');
mainApp = {};

(function(){
	var firebase = app_firebase;
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	  	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
	    welcome.textContent = ("Hello " + user.displayName + "!");
	    uid = user.uid;
	  } else {
	  	uid = null
	  	console.log("no user here...");
	  	window.location.replace("../auth/login.html");
	  }
	});

	function logOut(){
		firebase.auth().signOut();
		console.log("signing out..");
		window.location.replace("../index.html");
	}

	mainApp.logout = logOut;
})()

logOutBtn.addEventListener('click', (event) => {
	console.log("logging out!");
	mainApp.logout();
})
