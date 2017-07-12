function currentPlayerSession() {

	var decodeSession = decodeURIComponent(document.cookie);
	var sessionDetails = decodeSession.split(";");
	var sessionPlayer = "loggedInPlayer=";

	if( sessionDetails.length > 0 )
	{
		for( var i in sessionDetails )
		{
			var detail = sessionDetails[i];
			if( detail.indexOf(sessionPlayer) > -1 )
			{
				return detail.split(sessionPlayer)[1];
			}
		}
	}

	return "";
}

function createPlayerSession(loggedInPlayer) {

	var sessionDays = 7;
	var d = new Date();
	d.setTime(d.getTime() + sessionDays*24*60*60*1000);
	var sessionExpiration = "expires=" + d.toUTCString();

	document.cookie = "loggedInPlayer=" + loggedInPlayer + ";" + sessionExpiration + ";path=/";
}

function deletePlayerSession() {
	document.cookie = "loggedInPlayer=\"\"; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function playerSession() {
	this.newSession = createPlayerSession;
	this.currentPlayer = currentPlayerSession;
	this.deleteSession = deletePlayerSession;
}

var dndSession = new playerSession;
