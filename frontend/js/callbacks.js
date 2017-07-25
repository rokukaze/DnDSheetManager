
var characterDisplayPopulate = function(characterDetails) {

	dndCharacter.populateCharacterDetails(characterDetails[0]);
}

var characterAddPopulate = function(characterDetails) {

	dndCharacter.populateCharacterAdd(characterDetails[0]);
	dndDb.obtainCharacterDetails({"player":"base-character-template-player","campaign":"base-character-template-campaign"},dndCharacter.populateCharacterBaseTemplates);
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

var sendToDBSuccess = function(responseText) {
	console.log("Sending to DB complete!");
	console.log(responseText);
}

function callbacks() {
	this.playerLogin = playerLogin;
	this.characterDisplayPopulate = characterDisplayPopulate;
	this.characterAddPopulate = characterAddPopulate;
	this.sendToDBSuccess = sendToDBSuccess;
}

var dndCallbacks = new callbacks();
