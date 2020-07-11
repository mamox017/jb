const jobs = document.getElementById('jobcontainer');
const searchForm = document.getElementById('searchform');
const searchBar = document.getElementById('search');
var searchQuery = document.getElementById('query');
const nextQuery = document.getElementById('next');
const prevQuery = document.getElementById('prev');

const logOutBtn = document.getElementById('logOutBtn');

const all = document.getElementById('All');
const arts = document.getElementById('Arts');
const business = document.getElementById('Business');
const education = document.getElementById('Education');
const engineering = document.getElementById('Engineering');
const medical = document.getElementById('Medical');
const serviceIndustry = document.getElementById('Service Industry');
const tech = document.getElementById('Tech');
const other = document.getElementById('Other');
var query;

const categories = ["Arts", "Business", "Education", "Engineering", "Medical", "Service Industry", "Tech", "Other"];

var len = 0;
var pageNo = 0;
var limit = 5;
var currentResults = 0;
var lowerBound = 0;
var upperBound = 5;
var firstdoc;
var lastdoc;
var currentlyQuerying = false;

var mainApp = {};
var currUser;

(function(){
	var firebase = app_firebase;
	user = firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    currUser = user;
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
	applyButton.textContent = "Apply on Company Website";
	
	const divider = document.createElement('div');
	divider.className = 'btn-group';

	const appliedOptions = document.createElement('div');
	appliedOptions.className = 'btn-group';

	//if applied, replace with check mark?
	const appliedYes = document.createElement('button');
	appliedYes.className = 'btn btn-outline-success';
	appliedYes.onclick = (function () {
		console.log("writing to applied");
		db.collection('userdata').doc('jL7xOKpLcOOknd6MUhsn').collection(currUser.uid).add({
			jobs: doc.data().employer,
			title: doc.data().title
		})
		appliedYes.className = 'btn btn-success disabled';
		appliedYes.textContent = "Added to Applied List";
		appliedYes.onclick = (function () {
			console.log("disabled");
		})
	});
	appliedYes.textContent = "Mark Applied";
	if(db.collection('userdata').doc('jL7xOKpLcOOknd6MUhsn').collection(currUser.uid).get().then((snapshot) => {
		snapshot.docs.reverse().forEach(otherdoc => {
			if(otherdoc.data().title == doc.data().title && otherdoc.data().jobs == doc.data().employer) {
				appliedYes.textContent = "Applied";
				appliedYes.onclick = (function () {
					console.log("disabled");
				})
				applyButton.textContent = "Apply Again";
				appliedYes.className = 'btn btn-success disabled';
			}
		})
	}))
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

searchForm.addEventListener('keyup', (event) => {
	if(event.keyCode == 13) {
		searchBar.click();
	}
})

searchBar.addEventListener('click', (event) => {
	query = searchQuery.value;
	console.log(query);
	listjobs(query);
	searchForm.reset();
})

//normalize pixels
all.addEventListener('click', (event) => {
	query = null;
	listjobs(query);
})

arts.addEventListener('click', (event) => {
	query = "Arts";
	categorySearch(query);
})

business.addEventListener('click', (event) => {
	query = "Business";
	categorySearch(query);
})

education.addEventListener('click', (event) => {
	query = "Education";
	categorySearch(query);
})

engineering.addEventListener('click', (event) => {
	query = "Engineering";
	categorySearch(query);
})

medical.addEventListener('click', (event) => {
	query = "Medical";
	categorySearch(query);
})

serviceIndustry.addEventListener('click', (event) => {
	query = "Service Industry";
	categorySearch(query);
})

tech.addEventListener('click', (event) => {
	query = "Tech";
	categorySearch(query);
})

other.addEventListener('click', (event) => {
	query = "Other";
	categorySearch(query);
})

function categorySearch(category) {
	jobs.innerHTML = "";
	categoryCollection = db.collection('jobs').where("category", "==", category);
	categoryCollection.get().then((snapshot) => {
		snapshot.docs.reverse().forEach(doc => {
			displayOnSite(doc);
		})
	})
	nextQuery.className = 'btn btn-light disabled';
	prevQuery.className = 'btn btn-light disabled';
}

function listjobs(query, startAft=null, endBefore=null) {
	var collection = db.collection('jobs');
	firstInSnapshot = true;
	if(query == null) {
		if(startAft == null && endBefore == null) {
			collection = db.collection('jobs').orderBy("posted").limitToLast(limit);
		} else if (startAft != null) {
			collection = nextPage();
		} else if (endBefore != null) {
			collection = prevPage();
		}
		collection.get().then((snapshot) => {
			if(snapshot.size == 0) {
				if (pageNo == 0) {
					prevQuery.className = 'btn btn-light disabled';
				} else {
					console.log(snapshot.size);
					const endoflist = document.createElement('small');
					endoflist.className = 'text-center';
					endoflist.textContent = "No more jobs to display";
					jobs.appendChild(endoflist);
				}
			} else {
				jobs.innerHTML = "";
				snapshot.docs.reverse().forEach(doc => {
					if(firstInSnapshot) {
						firstdoc = doc;
						firstInSnapshot = false;
					}
					lastdoc = doc;
					displayOnSite(doc);
				})
			}
			if (snapshot.size < 5 && startAft != null) {
				nextQuery.className = 'btn btn-light disabled';
			} else if (nextQuery.className == 'btn btn-light disabled') {
				nextQuery.className = 'btn btn-light';
			}
		})
	} else {
		console.log("Query index: " + lowerBound);
		console.log("Query limit: " + upperBound);
		
		currentlyQuerying = true;
		len = 0;
		jobs.innerHTML = "";
		bagOfWords = db.collection('jobs').orderBy("posted");
		bagOfWords.get().then((snapshot) => {
			currentResults = 0;
			snapshot.docs.reverse().forEach(doc => {
				if (doc.data().words.includes(query.toLowerCase())) {
					len += 1;
				}
			})
			console.log("Query size: " + len);
			snapshot.docs.reverse().forEach(doc => {
				if(doc.data().words.includes(query.toLowerCase()) && currentResults >= lowerBound && currentResults < upperBound) {
					displayOnSite(doc);
					console.log(doc.data().title);
					console.log(currentResults)
					currentResults++;
				} else if (doc.data().words.includes(query.toLowerCase()) && currentResults < upperBound) {
					currentResults++;
				}
			})

			if(lowerBound > 0){
				prevQuery.className = 'btn btn-light';
			} else {
				prevQuery.className = 'btn btn-light disabled';
			}
			if(upperBound >= len - 1) {
				nextQuery.className = 'btn btn-light disabled';
			} else {
				nextQuery.className = 'btn btn-light';
			}
		})

		
		return;
	}
}

function nextPage(query=null) {
	return db.collection('jobs').orderBy('posted').endBefore(lastdoc).limitToLast(limit);
}

function prevPage(query=null) {
	return db.collection('jobs').orderBy('posted').startAfter(firstdoc).limit(limit);
}

prevQuery.addEventListener('click', (event) => {
	if (currentlyQuerying) {
		currentResults -= 5;
		lowerBound -= 5;
		upperBound -= 5;
	}
	listjobs(query, null, firstdoc);
	pageNo--;
	console.log(pageNo);
	if(pageNo <= 0) {
		prevQuery.className = 'btn btn-light disabled';
	}
})

nextQuery.addEventListener('click', (event) => {
	if (currentlyQuerying) {
		lowerBound += 5;
		upperBound += 5;
	}
	listjobs(query, lastdoc, null);
	if (prevQuery.className == 'btn btn-light disabled') {
		prevQuery.className = 'btn btn-light'
	}
	pageNo++;
	console.log(pageNo);
})

listjobs(query);