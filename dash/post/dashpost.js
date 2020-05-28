const form = document.getElementById('jobposting');
const btn = document.getElementById('post');
const titleIn = document.getElementById('title');
const empIn = document.getElementById('emp');
const cityIn = document.getElementById('city');
const stateIn = document.getElementById('state');
const descIn = document.getElementById('desc');
const linkIn = document.getElementById('link');
var e = document.getElementById("dropdown");
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

logOutBtn.addEventListener('click', (event) => {
	console.log("logging out!");
	mainApp.logout();
})

btn.addEventListener('click', (event) => {
	event.preventDefault();
	const employer = empIn.value;
	const title = titleIn.value;
	const description = descIn.value;
	const link = linkIn.value;
	const category = e.options[e.selectedIndex].value;
	const city = cityIn.value;
	const state = stateIn.value;
	const posted = Date.now();

	if (employer.trim() && title.trim() && link.trim()){
		const job = {
			employer,
			title,
			description,
			link,
			category,
			city,
			state,
			posted
		};
		storeJobs(job);
		//setTimeout(() => {  console.log("World!"); }, 2000);
		//window.location.href = "../listings/listing.html";
		//go to listings.html?
	}
})

function isValidPosting(job) {
	if(!(job.employer && job.employer.trim() !== '' &&
	job.title && job.title.trim() !== '' &&
	job.description && job.description.trim() !== '' &&
	job.link && job.link.trim() !== '')) {
		const formGrp = document.createElement('div');
	    formGrp.className = 'form-group';
	    const success = document.createElement('div');
	    success.className = 'alert alert-danger';
	    success.textContent = "Job successfully posted!";
	    formGrp.appendChild(success);
	    form.append(formGrp);
		return false;
	}

	if(job.link.substring(0,8) != "https://" && job.link.substring(0, 7) != "http://") {
	    const formGrp = document.createElement('div');
	    formGrp.className = 'form-group';
	    const success = document.createElement('div');
	    success.className = 'alert alert-danger';
	    success.textContent = "Please start the url with either https:// or http://";
	    formGrp.appendChild(success);
	    form.append(formGrp);
		return false;
	}

	return true;
}

//post route for /jobs
function storeJobs(job) {
	//validating received job struct has fields filled
	if (isValidPosting(job)) {
		db.collection("jobs").add({
		    employer: job.employer,
		    title: job.title,
		    description: job.description,
		    link: job.link,
		    category: job.category,
		    city: job.city,
		    state: job.state,
		    posted: job.posted
		})
		.then(function() {
		    console.log("Document successfully written!");
		    const formGrp = document.createElement('div');
		    formGrp.className = 'form-group';
		    const success = document.createElement('div');
		    success.className = 'alert alert-success';
		    success.textContent = "Job successfully posted!";
		    formGrp.appendChild(success);
		    form.append(formGrp);
		    form.reset();
		})
		.catch(function(error) {
		    console.error("Error writing document: ", error);
		});
	} else {
		res.status(422); //error not valid
		res.json({
			message: 'Hey! Required fields not given!'
		})
	}
}