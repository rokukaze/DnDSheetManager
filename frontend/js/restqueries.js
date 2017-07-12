function retreiveFromDB(collection, query, populateCallback) {

	if(typeof populateCallback === "function")
	{
		var staticURL = "http://dungeontracker.ca:18080/"+collection+"/?";

		for( key in query )
		{
			var strQuery = key+"="+query[key]+"&&";
			staticURL += strQuery;
		}

		console.log("Retrieving DND object");
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				populateCallback(JSON.parse(xhttp.responseText)); // Another callback here
			}
		}
		xhttp.open("GET", staticURL, true);
		xhttp.setRequestHeader("Content-type", "text/plain");
		xhttp.send();
	}
	else
	{
		console.log("invalid callback given");
	}
}

function queryCharacter(query,populateCallback) {
	retreiveFromDB("character",query,populateCallback);
}

function queryPlayer(query,populateCallback) {
	retreiveFromDB("player",query,populateCallback);
}

function queryCampaign(query,populateCallback) {
	retreiveFromDB("campaign",query,populateCallback);
}

function logCharacter(){
	logField("add-character-name");
	logField("add-character-player");
}

function logField(fieldName){
	try {
		console.log(document.getElementById(fieldName).value);//if null
	} catch (err) {
		console.log(err);
	}
}

//Class with class functions above
//JS class helpful info https://stackoverflow.com/questions/13190097/whats-the-best-way-to-create-javascript-classes
function dbObj() {
	this.obtainCharacterDetails = queryCharacter;
	this.obtainPlayerDetails = queryPlayer;
	this.obtainCampaignDetails = queryCampaign;
	//if set to function it is a pseudo function pointer, if set to function object, stores return value (i think?)
}

var dndDb = new dbObj();
