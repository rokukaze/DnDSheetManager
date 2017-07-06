function retreiveFromDB(character, dndobj, callback) {
	var staticURL = "http://dungeontracker.ca:18080/character/";
	console.log("Retrieving DND object");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			callback(xhttp.responseText, dndobj); // Another callback here
		}
	}
	xhttp.open("GET", staticURL + character, true);
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send();
}

function mycallback(data, dndobj) {
	var response = JSON.parse(data);
	console.log("Retrieval of DND object complete " + JSON.stringify(response));
	dndobj.populateHTML(response);
}

//Class with class functions above
//JS class helpful info https://stackoverflow.com/questions/13190097/whats-the-best-way-to-create-javascript-classes
function dbObj() {
	this.obtainCharacterDetails = retreiveFromDB;
	//if set to function it is a pseudo function pointer, if set to function object, stores return value (i think?)
}

var dndDb = new dbObj();