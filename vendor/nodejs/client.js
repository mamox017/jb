const welcome = document.getElementById('welcome');
const signInLogOutBtn = document.getElementById('signInLogOutBtn');
const tolistings = document.getElementById('tolisting');
const topost = document.getElementById('topost');
mainApp = {};

(function(){
	var firebase = app_firebase;
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	  	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
	    signInLogOutBtn.textContent = "Log out";
	  } else {
	  	uid = null;
	  	signInLogOutBtn.textContent = "Sign In";
	  }
	});

	function logOut(){
		firebase.auth().signOut();
		console.log("signing out..");
		window.location.replace("index.html");
	}

	mainApp.logout = logOut;
})()

signInLogOutBtn.addEventListener('click', (event) => {
	if(signInLogOutBtn.textContent == "Sign In") {
		window.location.replace("auth/login.html");
	} else {
		mainApp.logout();
	}
})

tolistings.addEventListener('click', (event) => {
	if(signInLogOutBtn.textContent == "Sign In") {
		window.location.replace("listings/listing.html");
	} else {
		window.location.replace("dash/dashboard/dashlistings.html");
	}
})

topost.addEventListener('click', (event) => {
	if(signInLogOutBtn.textContent == "Sign In") {
		window.location.replace("listings/listing.html");
	} else {
		window.location.replace("dash/post/dashpost.html");
	}
})