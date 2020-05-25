var mainApp = {};

(function(){
	var firebase = app_firebase;
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.
	    uid = user.uid;
	  } else {
	  	uid = null
	  	window.location.replace("../auth/login.html");
	  }
	});

	function logOut(){
		firebase.auth().signOut();
	}

	mainApp.logout = logout
})