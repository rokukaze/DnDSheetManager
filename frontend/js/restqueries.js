function retreiveFromDB(collection, query, dndobj, callback) {
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
			callback(xhttp.responseText, dndobj); // Another callback here
		}
	}
	xhttp.open("GET", staticURL, true);
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send();
}

function queryCharacter(name,player,campaign,dndobj,callback) {
	retreiveFromDB("character",{"campaign":campaign,"player":player,"name":name},dndobj,callback);
}

function queryPlayer(player,dndobj,callback) {
	retreiveFromDB("player",{"player":player},dndobj,callback);
}

function queryCampaign(campaign,dungeonMaster,dndobj,callback) {
	retreiveFromDB("campaign",{"campaign":campaign,"dungeonMaster":dungeonMaster},dndobj,callback);
}

function mycallback(data, dndobj) {
	var response = JSON.parse(data);
	console.log("Retrieval of DND object complete " + JSON.stringify(response));
	dndobj.populateHTML(response);
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
