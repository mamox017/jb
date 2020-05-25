const btn = document.getElementById('post');
const titleIn = document.getElementById('title');
const empIn = document.getElementById('emp');
const descIn = document.getElementById('desc');
const linkIn = document.getElementById('link');


btn.addEventListener('click', (event) => {
	event.preventDefault();
	const employer = empIn.value;
	const title = titleIn.value;
	const description = descIn.value;
	const link = linkIn.value;
	const posted = Date.now();

	if (employer.trim() && title.trim() && link.trim()){
		const job = {
			employer,
			title,
			description,
			link,
			posted
		};
		storeJobs(job);
		//listjobs();
	}
})

function isValidPosting(job) {
	return job.employer && job.employer.trim() !== '' &&
	job.title && job.title.trim() !== '' &&
	job.description && job.description.trim() !== '' &&
	job.link && job.link.trim() !== '';
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
		    posted: job.posted
		})
		.then(function() {
		    console.log("Document successfully written!");
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