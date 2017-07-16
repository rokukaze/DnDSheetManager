// Player HTML Generation
function populatePlayerDetails(playerData) {

	console.log("Populate player fields");
	var playerDetailsHTML = generate.rowContent("player-details",playerData["player"]);
	var playerCharactersHTML = generate.rowContent("player-characters","");
	var playerAddCharacterHTML = generate.rowContent("player-add-character",generatePlayerAddCharacter({}));
	var playerLogoutHTML = generate.rowContent("player-logout",generatePlayerLogout());

	var playerInfoHTML = generate.colContent("player-info",2,playerDetailsHTML+playerCharactersHTML+playerAddCharacterHTML+playerLogoutHTML);

	var playerCharacterHTML = generate.rowContent("character-display","");
	var playerCharacterDisplayHTML = generate.colContent("player-character-displayer",10,playerCharacterHTML);

	var playerHTML = playerInfoHTML+playerCharacterDisplayHTML;

	document.getElementById("dnd-display").innerHTML = playerHTML;
}

function populatePlayerCharacters(characters) {

	console.log("Populate player fields");
	document.getElementById("player-characters").innerHTML = generatePlayerCharacterList(characters);
}

// HTML Generation
function generatePlayerCharacterList(characters) {

	var html = "";

	var characterCount = 1;
	for( var character in characters )
	{
		var characterData = characters[character];

		var loggedInPlayer = dndSession.currentPlayer();
		var onclick = "dndDb.obtainCharacterDetails({";

		onclick += "'name':'"+characterData["name"]+"',";
		onclick += "'player':'"+loggedInPlayer+"',";
		onclick += "'campaign':'"+characterData["campaign"]+"'";
		onclick += "},dndCallbacks.characterDisplayPopulate)";

		html += generate.rowContent(null,generate.colWellWithOnClick(12,"player-character-"+characterCount,characterData["name"],characterData["campaign"],onclick));
	}

	html = generate.colContent("player-character-list",8,html);

	return html;
}

function generatePlayerAddCharacter() {

	var html = "";

	var loggedInPlayer = dndSession.currentPlayer();
	var onclick = "dndDb.obtainCharacterDetails({'name':'None','player':'base-character-template-player','campaign':'base-character-template-campaign'},dndCallbacks.characterAddPopulate)";

	html += generate.rowContent(null,generate.colWellWithOnClick(12,"player-add-character-display","Create new character","",onclick));

	html = generate.colContent(null,8,html);

	return html;
}

function generatePlayerLogout() {

	var html = "";

	var onclick = "dndSession.deleteSession();dndLogin.populateLoginPage()"

	html += generate.rowContent(null,generate.colWellWithOnClick(12,"player-logout-display","Logout","",onclick));

	html = generate.colContent(null,8,html);

	return html;
}

//dndObj Class w/ functions above
function playerPage() {
	this.populatePlayerDetails = populatePlayerDetails;
	this.populatePlayerCharacters = populatePlayerCharacters;
}

var dndPlayer = new playerPage();
