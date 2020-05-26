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
	applyButton.className = 'btn btn-outline-primary';
	applyButton.href = doc.data().link;
	applyButton.target = "_blank";
	applyButton.textContent = "Apply on Company Website";
	
	const divider = document.createElement('div');
	divider.className = 'btn-group';

	const appliedOptions = document.createElement('div');
	appliedOptions.className = 'btn-group';

	const appliedYes = document.createElement('a');
	appliedYes.className = 'btn btn-outline-success';
	appliedYes.textContent = "Mark Applied";
	//appliedYes.onclick = mark();
	/*const appliedNo = document.createElement('a');
	appliedNo.className = 'btn btn-light';
	appliedNo.textContent = "Mark Not Appleid";*/

	divChild.appendChild(divChildHeader);
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

all.addEventListener('click', (event) => {
	console.log("All");
	query = null;
	listjobs(query);
})

arts.addEventListener('click', (event) => {
	console.log("Arts");
	query = "Arts";
	listjobs(query);
})

business.addEventListener('click', (event) => {
	console.log("Business");
	query = "Business";
	listjobs(query);
})

education.addEventListener('click', (event) => {
	console.log("Education");
	query = "Education";
	listjobs(query);
})

engineering.addEventListener('click', (event) => {
	console.log("Engineering");
	query = "Engineering";
	listjobs(query);
})

medical.addEventListener('click', (event) => {
	console.log("Medical");
	query = "Medical";
	listjobs(query);
})

serviceIndustry.addEventListener('click', (event) => {
	console.log("Service Industry");
	query = "Service Industry";
	listjobs(query);
})

tech.addEventListener('click', (event) => {
	console.log("Tech");
	query = "Tech";
	listjobs(query);
})

other.addEventListener('click', (event) => {
	console.log("Other");
	query = "Other";
	listjobs(query);
})

function listjobs(query, startAft=null) {
	jobs.innerHTML = "";
	console.log(query);
	var collection = db.collection('jobs');
	if(query == null) {
		collection = db.collection('jobs').orderBy("posted").limit(5);
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
}

listjobs(query);