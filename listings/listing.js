const jobs = document.getElementById('jobcontainer');
const searchForm = document.getElementById('searchform');
const searchBar = document.getElementById('search');
const searchQuery = document.getElementById('query');

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

function listjobs(query=null) {
	console.log(query);
	if(query == null) {
		db.collection('jobs').where("category", "==", "Tech").orderBy("posted").limit(10).get().then((snapshot) => {
				snapshot.docs.reverse().forEach(doc => {
					displayOnSite(doc);
				})
		})
	} else {
		db.collection('jobs').where("title", "==", query).orderBy("posted").limit(10).get().then((snapshot) => {
				snapshot.docs.reverse().forEach(doc => {
					console.log(doc.data().title);
					displayOnSite(doc);
				})
		})
	}
}

searchBar.addEventListener('click', (event) => {
	query = searchQuery.value;
	listjobs(query);
	searchForm.reset();
})


listjobs();