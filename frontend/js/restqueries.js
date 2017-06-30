
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
//Gets JSON field and puts the value into a field of THE SAME NAME (could be made better such that the json field and the html field would be better differentiated)
function getJSONField(JSONFieldName) {
	var fieldName = DnDObj[JSONFieldName];
	console.log(fieldName);
	document.getElementById(fieldName).innerHTML = getUserText();
}


getJSONField("player");