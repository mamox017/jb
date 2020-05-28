const jobs = document.getElementById('jobcontainer');
const logOutBtn = document.getElementById('logOutBtn');

var mainApp = {};
var currUser;

(function(){
	var firebase = app_firebase;
	user = firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    currUser = user;
	    listjobs();
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

function parseDocThenDisplay(doc) {
	var eachJob = doc.data().jobs.split(",");
	for(i = 0; i < eachJob.length; i++) {
		var details = doc.data().jobs.split("*");
		displayOnSite(details[0], details[1]);
	}
}

function displayOnSite(company, title) {

	const div = document.createElement('div');
	div.className = 'card';

	const header = document.createElement('h5');
	header.className = 'card-header';
	header.textContent = "Position: " + company;

	const divChild = document.createElement('div');
	divChild.className = 'card-body';

	const divChildHeader = document.createElement('h5');
	divChildHeader.className = 'card-title';
	divChildHeader.textContent = "Company: " + title;
	
	const divider = document.createElement('div');
	divider.className = 'btn-group';

	//if applied, replace with check mark?
	const appliedYes = document.createElement('a');
	appliedYes.className = 'btn btn-success disabled';
	appliedYes.textContent = "Applied ✔";

	divChild.appendChild(divChildHeader);
	divChild.appendChild(appliedYes);
	div.appendChild(header);
	div.appendChild(divChild);
	jobs.appendChild(div);
	jobs.appendChild(divider);

}

function listjobs() {
	jobs.innerHTML = "";
	console.log("userid: " + currUser.uid);
	db.collection('userdata').doc('jL7xOKpLcOOknd6MUhsn').collection(currUser.uid).get().then((snapshot) => {
		snapshot.docs.reverse().forEach(doc => {
			displayOnSite(doc.data().title, doc.data().jobs);
		})
	});
}

logOutBtn.addEventListener('click', (event) => {
	console.log("logging out!");
	mainApp.logout();
})
