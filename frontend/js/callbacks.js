
var characterPopulate = function(characterDetails) {

	dndPlayer.populateCharacterDetails(characterDetails[0]);
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

function callbacks() {
	this.playerLogin = playerLogin;
	this.characterPopulate = characterPopulate;
}

var dndCallbacks = new callbacks();
