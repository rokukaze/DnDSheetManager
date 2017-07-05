try {
	var staticURL = "http://dungeontracker.ca:18080/character/";
	var playerURL = "OtherTestChar";
	var DnDObj = getUser();
	//getJSONField("player");
}
catch (err) {
	console.log(err);
}
//getJSONField("name");
populateDNDFields();

function getUserText() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", staticURL + playerURL, false); //find a way to set async to true and have it return when it has something
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send();
	var response = JSON.stringify(xhttp.responseText);
	console.log(response + " GetUserText() Response");
	return response;
}

function getUser() {
function initDNDObj() {
	console.log("Retrieving DND object");
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", staticURL + playerURL, false); //find a way to set async to true and have it return when it has something
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send();
	var response = JSON.parse(xhttp.responseText);
	console.log("Retrieval of DND object complete " + response);
	return response;
}
//Gets JSON field and puts the value into a field of THE SAME NAME 
//(could be made better such that the json field and the html field can be different)
function grabJSONField(JSONFieldName) {
	var fieldName = DnDObj[JSONFieldName];
	if (JSONFieldName == null) {
		console.log("Null JSON field");
	}
	console.log("Retriving JSON Field " + JSONFieldName);
	try {
		if (fieldName == null) {
			document.getElementById(JSONFieldName).innerHTML = JSONFieldName;
		} else {
			document.getElementById(JSONFieldName).innerHTML = fieldName;
		}
	} catch (err) {
		console.log(err);
		//usually because the inner html field is null (no such id or campaign field ATM)
	}

}

//Populate all fields on the page
function populateDNDFields() {
	console.log("Populating fields")
	for (var field in DnDObj) {
		grabJSONField(field);
	}
	console.log("Populating fields complete")
}
