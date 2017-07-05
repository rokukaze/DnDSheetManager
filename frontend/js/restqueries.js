try {
	var staticURL = "http://dungeontracker.ca:18080/character/";
	var playerURL = "OtherTestChar";
	var DnDObj = getUser();
	//getJSONField("player");
}
catch (err) {
	console.log(err);
}
//getJSONField("name");
populateDNDFields();

function getUserText() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", staticURL + playerURL, false); //find a way to set async to true and have it return when it has something
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send();
	var response = JSON.stringify(xhttp.responseText);
	console.log(response + " GetUserText() Response");
	return response;
}

function getUser() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", staticURL + playerURL, false); //find a way to set async to true and have it return when it has something
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send();
	var response = JSON.parse(xhttp.responseText);
	console.log(response + " GetUser() Response");
	return response;
}
//Gets JSON field and puts the value into a field of THE SAME NAME (could be made better such that the json field and the html field would be better differentiated)
function getJSONField(JSONFieldName) {
	var fieldName = DnDObj[JSONFieldName];
	console.log(fieldName + " getJSONField()");
	if (fieldName == null) {
		document.getElementById(JSONFieldName).innerHTML = JSONFieldName;
	} else {
		document.getElementById(JSONFieldName).innerHTML = fieldName;
	}
}

//Populate all fields on the page
function populateDNDFields() {
	getJSONField("name");//character name
	getJSONField("classAndLvl");
	getJSONField("background");
	getJSONField("player");//player name
	getJSONField("race");
	getJSONField("alignment");
	getJSONField("xp");
	getJSONField("str");
	getJSONField("dex");
	getJSONField("con");
	getJSONField("int");
	getJSONField("wis");
	getJSONField("cha");
	getJSONField("passPerc");
	getJSONField("otherProfLang");
	getJSONField("conditions");
	getJSONField("ac");
	getJSONField("boons");
	getJSONField("init");
	getJSONField("tempHP");
	getJSONField("spd");
	getJSONField("hitDice");
	getJSONField("currHP");
	getJSONField("maxHP");
	getJSONField("deathSaves");
	getJSONField("weapName");
	getJSONField("atkBonus");
	getJSONField("dmgType");
	getJSONField("spellDesc");
	getJSONField("equipmentAndGold");
	getJSONField("inspir");
	getJSONField("personTraits");
	getJSONField("ideals");
	getJSONField("bonds");
	getJSONField("flaws");
	getJSONField("featsAndTraits");

}
