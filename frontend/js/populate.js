// Generic html generation
function generateRowContent(id,content) {

	var html = "<div class=\"row\""
	
	if( !(id == null) )
	{
		html += " id=\""+id+"\""
	}

	html += ">";
	html += content;
	html += "</div>";

	return html;
}

function generateColContent(id,colSize,content) {

	var html = "<div class=\"col-xs-"+colSize+"\""

	if( !(id == null) )
	{
		html += " id=\""+id+"\""
	}

	html += ">";
	html += content;
	html += "</div>";

	return html;
}

function generateColWell(colSize,id,label,value) {

	var html = "<div class=\"col-xs-"+colSize+"\">";

	html += "<div class=\"well\" id=\""+id+"\">";
	html += "<div class=\"well-label\">"+label+"</div>";
	html += "<div class=\"well-value\">"+value+"</div>";

	html += "</div></div>";

	return html;
}

function generateColWellWithOnClick(colSize,id,label,value,onclick) {

	var html = "<div class=\"col-xs-"+colSize+"\" onclick=\""+onclick+"\">";

	html += "<div class=\"well\" id=\""+id+"\">";
	html += "<div class=\"well-label\">"+label+"</div>";
	html += "<div class=\"well-value\">"+value+"</div>";

	html += "</div></div>";

	return html;
}

// Player HTML Generation
function populatePlayerDetails(playerData) {

	console.log("Populate player fields");
	document.getElementById("player-details").innerHTML = playerData["player"];
}

function populatePlayerCharacters(characters) {

	console.log("Populate player fields");
	document.getElementById("player-characters").innerHTML = generatePlayerCharacterList(characters);
}

function generatePlayerCharacterList(characters) {

	var html = "";

	var characterCount = 1;
	for( var character in characters )
	{
		var characterData = characters[character];

		var onclick = "db.obtainCharacterDetails({";

		onclick += "'name':'"+characterData["name"]+"',";
		onclick += "'player':'"+characterData["player"] +"',";
		onclick += "'campaign':'"+characterData["campaign"]+"'";
		onclick += "},charPopulateCallback)";

		html += generateRowContent(null,generateColWellWithOnClick(12,"player-character-"+characterCount,characterData["name"],characterData["campaign"],onclick));
	}

	html = generateColContent("player-character-list",8,html);

	return html;
}

// Character HTML Generation
function populateCharacterDisplay(characterData) {

	console.log("Populating character fields");
	document.getElementById("character-display").innerHTML = generateCharacterInfo(characterData);
}

function generateCharacterInfo(characterData) {

	var html = "";

	html += generateCharacterHeader(characterData);
	html += generateCharacterAttributes(characterData);
	html += generateCharacterBattleInfo(characterData);
	html += generateCharacterTraits(characterData);

	return html;
}

function generateCharacterHeader(characterData) {

	var html = "";

	var name = generateColWell(4,"name","Character Name",characterData["name"]);
	html += generateRowContent(null,name);

	var level = generateColWell(3,"classAndLevel","Class & Level",characterData["classAndLevel"]);
	var player = generateColWell(3,"player","Player Name",characterData["player"]);
	var background = generateColWell(3,"background","Background",characterData["background"]);
	var faction = generateColWell(3,"faction","Faction",characterData["faction"]);
	html += generateRowContent(null,level+player+background+faction);

	var race = generateColWell(3,"race","Race",characterData["race"]);
	var alignment = generateColWell(3,"alignment","Alignment",characterData["alignment"]);
	var xp = generateColWell(3,"xp","Experience Points",characterData["xp"]);
	var dci = generateColWell(3,"xp","DCI Number",characterData["dci"]);
	html += generateRowContent(null,race+alignment+xp+dci);

	html = generateRowContent("character-header",generateColContent(null,12,html));

	return html;
}

function generateCharacterAttributes(characterData) {

	var html = "";

	var str = generateColWell(2,"str","Strength",characterData["strength"]);
	var dex = generateColWell(2,"dex","Dexterity",characterData["dexterity"]);
	var cons = generateColWell(2,"const","Constitution",characterData["constitution"]);
	var intel = generateColWell(2,"int","Intelligence",characterData["intelligence"]);
	var wis = generateColWell(2,"wis","Wisdom",characterData["wisdom"]);
	var cha = generateColWell(2,"cha","Charisma",characterData["charisma"]);
	html += generateRowContent(null,str+dex+cons+intel+wis+cha);

	html = generateRowContent("character-attributes",generateColContent(null,12,html));

	return html;
}

function generateCharacterBattleInfo(characterData) {

	var html = "";

	var ac = generateColWell(4,"armour","Armour Class",characterData["armourClass"]);
	var init = generateColWell(4,"init","Initiative",characterData["initiative"]);
	var spd = generateColWell(4,"speed","Speed",characterData["speed"]);
	html += generateRowContent(null,ac+init+spd);

	var max = generateColWell(4,"maxHP","Maximum HP",characterData["maxHP"]);
	var curr = generateColWell(4,"currHP","Current HP",characterData["currHP"]);
	var temp = generateColWell(4,"tempHP","Temporary HP",characterData["tempHP"]);
	html += generateRowContent(null,max+curr+temp);

	var hit = generateColWell(4,"hitDice","Hit Dice",characterData["hitDice"]);
	var ds = generateColWell(8,"deathSaves","Death Saves",characterData["deathSaves"]);
	html += generateRowContent(null,hit+ds);

	html = generateRowContent("character-battle-info",generateColContent(null,12,html));

	return html;
}

function generateCharacterTraits(characterData) {

	var html = "";

	var personal = generateColWell(3,"personalTraits","Personal Traits",characterData["personalTraits"]);
	var ideals = generateColWell(3,"ideals","Ideals",characterData["ideals"]);
	var bonds = generateColWell(3,"bonds","Bonds",characterData["bonds"]);
	var flaws = generateColWell(3,"flaws","Flaws",characterData["flaws"]);
	html += generateRowContent(null,personal+ideals+bonds+flaws);

	html = generateRowContent("character-traits",generateColContent(null,12,html));

	return html;
}

//dndObj Class w/ functions above
function dndObj() {
	this.populateCharacter = populateCharacterDisplay;
	this.populatePlayerDetails = populatePlayerDetails;
	this.populatePlayerCharacters = populatePlayerCharacters;
}

var dndPopulate = new dndObj();
