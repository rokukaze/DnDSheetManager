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

function queryCharacter(name,player,campaign,populateCallback) {
	retreiveFromDB("character",{"campaign":campaign,"player":player,"name":name},populateCallback);
}

function queryPlayer(player,populateCallback) {
	retreiveFromDB("player",{"player":player},populateCallback);
}

function queryCampaign(campaign,dungeonMaster,populateCallback) {
	retreiveFromDB("campaign",{"campaign":campaign,"dungeonMaster":dungeonMaster},populateCallback);
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
