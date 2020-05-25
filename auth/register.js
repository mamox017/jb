const btn = document.getElementById('register');

btn.addEventListener('click', (event) => {
	event.preventDefault();
	console.log("registering");
	window.open("../dash/index.html", "_self");
	//Search bar algorithm
})