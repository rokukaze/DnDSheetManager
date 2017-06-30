
var DnDObj = getUser();

function getUserText() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://ec2-34-208-19-115.us-west-2.compute.amazonaws.com:18080/player/rob", false); //find a way to set async to true and have it return when it has something
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send();
	var response = JSON.stringify(xhttp.responseText);
	console.log(response);
	return response;
}

function getUser() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://ec2-34-208-19-115.us-west-2.compute.amazonaws.com:18080/player/rob", false); //find a way to set async to true and have it return when it has something
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send();
	var response = JSON.parse(xhttp.responseText);
	console.log(response);
	return response;
}
