function populateLoginPage() {

	var currentPlayer = dndSession.currentPlayer();

	if( currentPlayer == "" )
	{
		var loginEntry = "<input class=\"col-xs-12\" type=\"text\" id=\"enter-player-login\">";
		var loginButton = "<button onclick=\"dndLogin.verifyPlayerLogin()\">Player Login</button>";
		var loginWell = generate.colWell(12,"player-login-button",loginEntry,loginButton,false);
		var loginEntryHTML = generate.rowContent("player-login",loginWell);

		var loginHTML = generate.colContent("player-login-display",4,loginEntryHTML);

		document.getElementById("dnd-display").innerHTML = loginHTML;
	}
	else
	{
		dndCallbacks.playerLogin(currentPlayer);
	}
}

function verifyPlayerLogin() {

	var playerName = document.getElementById("enter-player-login").value;

	if( playerName == null || playerName == "" )
	{
		console.log("Invalid player name");
	}
	else
	{
		dndSession.newSession(playerName);
		dndCallbacks.playerLogin(playerName);
	}
}

function loginPage() {
	this.populateLoginPage = populateLoginPage;
	this.verifyPlayerLogin = verifyPlayerLogin;
}

var dndLogin = new loginPage();
