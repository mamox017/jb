function displayOnSite(doc) {
	console.log(doc.data().title);
	console.log(doc.data().employer);
	console.log(doc.data().description);
	console.log(doc.data().link);
	console.log(doc.data().posted);
}

function listjobs() {
	//jobs.innerHTML = '';
	db.collection('jobs').orderBy("posted").get().then((snapshot) => {
			snapshot.docs.reverse().forEach(doc => {
				displayOnSite(doc);
			})
	})
}

listjobs();