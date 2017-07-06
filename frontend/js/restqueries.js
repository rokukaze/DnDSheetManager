function retreiveFromDB(character) {
		var staticURL = "http://dungeontracker.ca:18080/character/";
		console.log("Retrieving DND object");
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", staticURL + character, false); //find a way to set async to true and have it return when it has something
		xhttp.setRequestHeader("Content-type", "text/plain");
		xhttp.send();
		var response = JSON.parse(xhttp.responseText);
		console.log("Retrieval of DND object complete " + response);
		return response;
}


//Class
//JS class helpful info https://stackoverflow.com/questions/13190097/whats-the-best-way-to-create-javascript-classes
function dbObj() {
	this.obtainCharacterDetails = retreiveFromDB;
}

//Gets JSON field and puts the value into a field of THE SAME NAME 
//(could be made better such that the json field and the html field can be different)

//Populate all fields on the page


//Execution and Invocation

var dndDb = new dbObj();
