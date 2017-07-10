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

function generateColWell(colSize,id,label,value,addValue) {

	var html = "<div class=\"col-xs-"+colSize+"\">";

	if( value == null )
	{
		value = "";
	}

	if( addValue )
	{
		html += "<div class=\"well\">";
		html += "<div class=\"well-label\">"+label+"</div>";
		html += "<input class=\"col-xs-12\" type=\"text\" name=\"add-character-"+id+"\" value=\""+value+"\">";
	}
	else
	{
		html += "<div class=\"well\" id=\"display-character-"+id+"\">";
		html += "<div class=\"well-label\">"+label+"</div>";
		html += "<div class=\"well-value\">"+value+"</div>";
	}

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
	document.getElementById("player-add-character").innerHTML = generatePlayerAddCharacter(playerData["player"]);
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

function generatePlayerAddCharacter(playerName) {

	var html = "";

	var onclick = "populate.populateCharacterAdd({'player':'"+playerName+"'})";

	html += generateRowContent(null,generateColWellWithOnClick(12,"player-add-character-display","Create new character","",onclick));

	html = generateColContent(null,8,html);

	return html;
}

// Character HTML Generation
function populateCharacterDisplay(characterData) {

	console.log("Populating character fields");
	document.getElementById("character-display").innerHTML = generateCharacterInfo(characterData,false);
}

function populateCharacterAdd(characterData) {

	console.log("Populating add character fields");
	document.getElementById("character-display").innerHTML = generateCharacterInfo(characterData,true);
}

function generateCharacterInfo(characterData,addValue) {

	var html = "";

	html += generateCharacterHeader(characterData,addValue);
	html += generateCharacterAttributes(characterData,addValue);
	html += generateCharacterBattleInfo(characterData,addValue);
	html += generateCharacterTraits(characterData,addValue);

	return html;
}

function generateCharacterHeader(characterData,addValue) {

	var html = "";

	var name = generateColWell(4,"name","Character Name",characterData["name"],addValue);
	html += generateRowContent(null,name);

	var level = generateColWell(3,"classAndLevel","Class & Level",characterData["classAndLevel"],addValue);
	var player = generateColWell(3,"player","Player Name",characterData["player"],false);
	var background = generateColWell(3,"background","Background",characterData["background"],addValue);
	var faction = generateColWell(3,"faction","Faction",characterData["faction"],addValue);
	html += generateRowContent(null,level+player+background+faction);

	var race = generateColWell(3,"race","Race",characterData["race"],addValue);
	var alignment = generateColWell(3,"alignment","Alignment",characterData["alignment"],addValue);
	var xp = generateColWell(3,"xp","Experience Points",characterData["xp"],addValue);
	var dci = generateColWell(3,"dci","DCI Number",characterData["dci"],addValue);
	html += generateRowContent(null,race+alignment+xp+dci);

	html = generateRowContent("character-header",generateColContent(null,12,html));

	return html;
}

function generateCharacterAttributes(characterData,addValue) {

	var html = "";

	var str = generateColWell(2,"strength","Strength",characterData["strength"],addValue);
	var dex = generateColWell(2,"dexterity","Dexterity",characterData["dexterity"],addValue);
	var cons = generateColWell(2,"constitution","Constitution",characterData["constitution"],addValue);
	var intel = generateColWell(2,"intelligence","Intelligence",characterData["intelligence"],addValue);
	var wis = generateColWell(2,"wisdom","Wisdom",characterData["wisdom"],addValue);
	var cha = generateColWell(2,"charisma","Charisma",characterData["charisma"],addValue);
	html += generateRowContent(null,str+dex+cons+intel+wis+cha);

	html = generateRowContent("character-attributes",generateColContent(null,12,html));

	return html;
}

function generateCharacterBattleInfo(characterData,addValue) {

	var html = "";

	var ac = generateColWell(4,"armourClass","Armour Class",characterData["armourClass"],addValue);
	var init = generateColWell(4,"initiative","Initiative",characterData["initiative"],addValue);
	var spd = generateColWell(4,"speed","Speed",characterData["speed"],addValue);
	html += generateRowContent(null,ac+init+spd);

	var max = generateColWell(4,"maxHP","Maximum HP",characterData["maxHP"],addValue);
	var curr = generateColWell(4,"currHP","Current HP",characterData["currHP"],addValue);
	var temp = generateColWell(4,"tempHP","Temporary HP",characterData["tempHP"],addValue);
	html += generateRowContent(null,max+curr+temp);

	var hit = generateColWell(4,"hitDice","Hit Dice",characterData["hitDice"],addValue);
	var ds = generateColWell(8,"deathSaves","Death Saves",characterData["deathSaves"],addValue);
	html += generateRowContent(null,hit+ds);

	html = generateRowContent("character-battle-info",generateColContent(null,12,html));

	return html;
}

function generateCharacterTraits(characterData,addValue) {

	var html = "";

	var personal = generateColWell(3,"personalTraits","Personal Traits",characterData["personalTraits"],addValue);
	var ideals = generateColWell(3,"ideals","Ideals",characterData["ideals"],addValue);
	var bonds = generateColWell(3,"bonds","Bonds",characterData["bonds"],addValue);
	var flaws = generateColWell(3,"flaws","Flaws",characterData["flaws"],addValue);
	html += generateRowContent(null,personal+ideals+bonds+flaws);

	html = generateRowContent("character-traits",generateColContent(null,12,html));

	return html;
}

//dndObj Class w/ functions above
function dndObj() {
	this.populateCharacterDetails = populateCharacterDisplay;
	this.populateCharacterAdd = populateCharacterAdd;
	this.populatePlayerDetails = populatePlayerDetails;
	this.populatePlayerCharacters = populatePlayerCharacters;
}

var dndPopulate = new dndObj();
