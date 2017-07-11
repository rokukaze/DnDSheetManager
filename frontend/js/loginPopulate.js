function populateLoginPage(loginCallback) {

	var loginEntry = "<input class=\"col-xs-12\" type=\"text\" id=\"enter-player-login\">";
	var loginButton = "<button onclick=\"dndLoginPopulate.verifyPlayerLogin("+loginCallback+")\">Player Login</button>";
	var loginWell = generate.colWell(12,"player-login-button",loginEntry,loginButton,false);
	var loginEntryHTML = generate.rowContent("player-login",loginWell);

	var loginHTML = generate.colContent("player-login-display",4,loginEntryHTML);

	document.getElementById("dnd-display").innerHTML = loginHTML;
}

function verifyPlayerLogin(loginCallback) {

	var loginPlayer = document.getElementById("enter-player-login").value;

	if( loginPlayer == null || loginPlayer == "" )
	{
		console.log("Invalid player name");
	}
	else
	{
		loginCallback(loginPlayer);
	}
}

function generateLoginHTML() {
	this.populateLoginPage = populateLoginPage;
	this.verifyPlayerLogin = verifyPlayerLogin;
}

var dndLoginPopulate = new generateLoginHTML();
