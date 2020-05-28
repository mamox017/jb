const jobs = document.getElementById('jobcontainer');
const logOutBtn = document.getElementById('logOutBtn');

var mainApp = {};

(function(){
	var firebase = app_firebase;
	user = firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
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

function displayOnSite(doc) {
	const div = document.createElement('div');
	div.className = 'card';

	const header = document.createElement('h5');
	header.className = 'card-header';
	header.textContent = "Position: " + doc.data().title;

	const divChild = document.createElement('div');
	divChild.className = 'card-body';

	const divChildHeader = document.createElement('h5');
	divChildHeader.className = 'card-title';
	divChildHeader.textContent = "Company: " + doc.data().employer;

	const divChildLoc = document.createElement('p');
	divChildLoc.className = 'card-title';
	divChildLoc.textContent = "Location: " + doc.data().city + ", " + doc.data().state;

	const divChildText = document.createElement('p');
	divChildText.className = 'card-text';
	divChildText.textContent = doc.data().description;

	const divChildCategory = document.createElement('small');
	divChildCategory.className = 'form-text text-muted';
	divChildCategory.textContent = "Category: " + doc.data().category;

	const divChildDate = document.createElement('small');
	divChildDate.className = 'form-text text-muted';
	divChildDate.textContent = "Posted on " + new Date(doc.data().posted);

	const applyButton = document.createElement('a');
	applyButton.className = 'btn btn-outline-primary';
	applyButton.href = doc.data().link;
	applyButton.target = "_blank";
	applyButton.textContent = "Apply Again";
	
	const divider = document.createElement('div');
	divider.className = 'btn-group';

	const appliedOptions = document.createElement('div');
	appliedOptions.className = 'btn-group';

	//if applied, replace with check mark?
	const appliedYes = document.createElement('a');
	appliedYes.className = 'btn btn-success disabled';
	appliedYes.textContent = "Applied ✔";
	//appliedYes.onclick = mark();
	/*const appliedNo = document.createElement('a');
	appliedNo.className = 'btn btn-light';
	appliedNo.textContent = "Mark Not Appleid";*/

	divChild.appendChild(divChildHeader);
	divChild.appendChild(divChildLoc);
	divChild.appendChild(divChildText);
	divChild.appendChild(divChildCategory);
	divChild.appendChild(divChildDate);
	divChild.appendChild(applyButton);
	appliedOptions.appendChild(appliedYes);
	divChild.appendChild(appliedOptions);
	div.appendChild(header);
	div.appendChild(divChild);
	jobs.appendChild(div);
	jobs.appendChild(divider);

}

function listjobs() {
	jobs.innerHTML = "";
	console.log("first page!");
	collection = db.collection('jobs').orderBy("posted");
	collection.get().then((snapshot) => {
		snapshot.docs.reverse().forEach(doc => {
			displayOnSite(doc);
			lastdoc = doc;
		})
	})
}

listjobs();

logOutBtn.addEventListener('click', (event) => {
	console.log("logging out!");
	mainApp.logout();
})
