function retreiveFromDB(collection, query, populateCallback) {//additional send true false boolean parameter to fuse DB queries?

	if(typeof populateCallback === "function")
	{
		var staticURL = "http://db.dungeontracker.ca:18080/"+collection+"/?";

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

function sendCommandToDB(data, populateCallback) {

	if(typeof populateCallback === "function")
	{
		var staticURL = "http://db.dungeontracker.ca:18080/command";

		console.log("Sending DND object");
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				populateCallback(JSON.stringify(xhttp.responseText)); // Another callback here
			}
		}
		xhttp.open("PUT", staticURL, true);
		xhttp.setRequestHeader("Content-type", "text/plain");
		xhttp.send(data);
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

//Class with class functions above
//JS class helpful info https://stackoverflow.com/questions/13190097/whats-the-best-way-to-create-javascript-classes
function dbObj() {
	this.obtainCharacterDetails = queryCharacter;
	this.obtainPlayerDetails = queryPlayer;
	this.obtainCampaignDetails = queryCampaign;
	this.sendCommandToDB = sendCommandToDB;
	//if set to function it is a pseudo function pointer, if set to function object, stores return value (i think?)
}

var dndDb = new dbObj();
