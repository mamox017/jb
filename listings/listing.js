const hero = document.getElementById('herotext');
const mast = document.getElementById('mast');

const jobs = document.getElementById('jobcontainer');
const searchForm = document.getElementById('searchform');
const searchBar = document.getElementById('search');
var searchQuery = document.getElementById('query');

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
	applyButton.className = 'btn btn-primary';
	applyButton.href = doc.data().link;
	applyButton.textContent = "Apply on Company Website";
	
	const divider = document.createElement('div');
	divider.className = 'btn-group';

	divChild.appendChild(divChildHeader);
	divChild.appendChild(divChildText);
	divChild.appendChild(divChildCategory);
	divChild.appendChild(divChildDate);
	divChild.appendChild(applyButton);
	div.appendChild(header);
	div.appendChild(divChild);
	jobs.appendChild(div);
	jobs.appendChild(divider);

}

function listjobs(query, startAft=null) {
	jobs.innerHTML = "";
	console.log(query);
	var collection = db.collection('jobs');
	if(query == null) {
		collection = db.collection('jobs').orderBy("posted");
		collection.get().then((snapshot) => {
		snapshot.docs.reverse().forEach(doc => {
			displayOnSite(doc);
		})
	})
	} else {
		collection = db.collection('jobs').where("title", "==", query);
		descSearch = db.collection('jobs').where("description", "==", query);
		employerSearch = db.collection('jobs').where("employer", "==", query);
		categorySearch = db.collection('jobs').where("category", "==", query);
		
		collection.get().then((snapshot) => {
			snapshot.docs.reverse().forEach(doc => {
				displayOnSite(doc);
			})
		})
		
		descSearch.get().then((snapshot) => {
			snapshot.docs.reverse().forEach(doc => {
				displayOnSite(doc);
			})
		})
		
		employerSearch.get().then((snapshot) => {
			snapshot.docs.reverse().forEach(doc => {
				displayOnSite(doc);
			})
		})
		
		categorySearch.get().then((snapshot) => {
			snapshot.docs.reverse().forEach(doc => {
				displayOnSite(doc);
			})
		})
	}

	//failed search
	/*if(jobs.innerHTML == "") {
		const formGrp = document.createElement('div');
	    formGrp.className = 'form-group';
	    const success = document.createElement('div');
	    success.className = 'alert alert-danger';
	    success.textContent = "No results match your search";
	    formGrp.appendChild(success);
		jobs.appendChild(formGrp);
	}*/
}

searchQuery.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
  	event.preventDefault();
  	console.log("ENTER");
    // Cancel the default action, if needed
    
    // Trigger the button element with a click
    console.log("CLICKING");
    searchBar.click();
  }
});

searchBar.addEventListener('click', (event) => {
	query = searchQuery.value;
	console.log(query);
	listjobs(query);
	searchForm.reset();
})

//normalize pixels
all.addEventListener('click', (event) => {
	console.log("All");
	herotext.textContent = "All Jobs";
	mast.className = "masthead10 text-white text-center";
	query = null;
	listjobs(query);
})

arts.addEventListener('click', (event) => {
	console.log("Arts");
	herotext.textContent = "Arts";
	mast.className = "masthead2 text-white text-center";
	query = "Arts";
	listjobs(query);
})

business.addEventListener('click', (event) => {
	console.log("Business");
	herotext.textContent = "Business";
	mast.className = "masthead3 text-white text-center";
	query = "Business";
	listjobs(query);
})

education.addEventListener('click', (event) => {
	console.log("Education");
	herotext.textContent = "Education";
	mast.className = "masthead4 text-white text-center";
	query = "Education";
	listjobs(query);
})

engineering.addEventListener('click', (event) => {
	console.log("Engineering");
	herotext.textContent = "Engineering";
	mast.className = "masthead5 text-white text-center";
	query = "Engineering";
	listjobs(query);
})

medical.addEventListener('click', (event) => {
	console.log("Medical");
	herotext.textContent = "Medical";
	mast.className = "masthead6 text-white text-center";
	query = "Medical";
	listjobs(query);
})

serviceIndustry.addEventListener('click', (event) => {
	console.log("Service Industry");
	herotext.textContent = "Service Industry";
	mast.className = "masthead8 text-white text-center";
	query = "Service Industry";
	listjobs(query);
})

tech.addEventListener('click', (event) => {
	console.log("Tech");
	herotext.textContent = "Tech";
	mast.className = "masthead7 text-white text-center";
	query = "Tech";
	listjobs(query);
})

other.addEventListener('click', (event) => {
	console.log("Other");
	herotext.textContent = "Other Jobs";
	mast.className = "masthead9 text-white text-center";
	query = "Other";
	listjobs(query);
})

function paginate(collection) {
	return collection.get().then(function (documentSnapshots) {
	  // Get the last visible document
	  var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
	  console.log("last", lastVisible);

	  // Construct a new query starting at this document,
	  // get the next 25 cities.
	  var next = db.collection("cities")
	          .orderBy("population")
	          .startAfter(lastVisible)
	          .limit(25);
	});
}

listjobs(query);