
var characterPopulate = function(characterDetails) {

	dndCharacter.populateCharacterDetails(characterDetails[0]);
}

var playerCharacterListPopulate = function(characters) {

	dndPlayer.populatePlayerCharacters(characters);
}

var playerPopulate = function(playerDetails) {

	var player = playerDetails[0];

	dndPlayer.populatePlayerDetails(player);
	dndDb.obtainCharacterDetails({"player":player["player"]},playerCharacterListPopulate);
}

var playerLogin = function(playerName) {

	if( playerName == null || playerName == "" )
	{
		console.log("Invalid player name");
	}
	else
	{
		dndDb.obtainPlayerDetails({"player":playerName},playerPopulate);
	}
}

var sendSuccess = function(responseText) {
	console.log("Sending to DB complete!");
	console.log(responseText);
}

function callbacks() {
	this.playerLogin = playerLogin;
	this.characterPopulate = characterPopulate;
	this.sendSuccess = sendSuccess;
}

var dndCallbacks = new callbacks();
