// Generic html generation
function generateColContent(colSize,content) {

	var html = "<div class=\"col-xs-"+colSize+"\">";
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

//Populate all fields on the page
function populateCharacterFields(characterData) {

	console.log("Populating fields");
	document.getElementById("characterHeader").innerHTML = generateCharacterHeader(characterData);
	document.getElementById("characterAttributes").innerHTML = generateCharacterAttributes(characterData);
	document.getElementById("characterBattleInfo").innerHTML = generateCharacterBattleInfo(characterData);
	document.getElementById("characterTraits").innerHTML = generateCharacterTraits(characterData);
	console.log("Populating fields complete");
}

function generateCharacterHeader(characterData) {

	var html = "<div class=\"col-xs-12\">";

	var name = generateColWell(4,"name","Character Name",characterData["name"]);
	html += generateRowWithContent(name);

	var level = generateColWell(3,"classAndLevel","Class & Level",characterData["classAndLevel"]);
	var player = generateColWell(3,"player","Player Name",characterData["player"]);
	var background = generateColWell(3,"background","Background",characterData["background"]);
	var faction = generateColWell(3,"faction","Faction",characterData["faction"]);
	html += generateRowWithContent(level+player+background+faction);

	var race = generateColWell(3,"race","Race",characterData["race"]);
	var alignment = generateColWell(3,"alignment","Alignment",characterData["alignment"]);
	var xp = generateColWell(3,"xp","Experience Points",characterData["xp"]);
	var dci = generateColWell(3,"xp","DCI Number",characterData["dci"]);
	html += generateRowWithContent(race+alignment+xp+dci);

	html += "</div>";
	return html;
}

function generateCharacterAttributes(characterData) {

	var html = "<div class=\"col-xs-12\">";

	var str = generateColWell(2,"str","Strength",characterData["strength"]);
	var dex = generateColWell(2,"dex","Dexterity",characterData["dexterity"]);
	var cons = generateColWell(2,"const","Constitution",characterData["constitution"]);
	var intel = generateColWell(2,"int","Intelligence",characterData["intelligence"]);
	var wis = generateColWell(2,"wis","Wisdom",characterData["wisdom"]);
	var cha = generateColWell(2,"cha","Charisma",characterData["charisma"]);
	html += generateRowWithContent(str+dex+cons+intel+wis+cha);

	html += "</div>";
	return html;
}

function generateCharacterBattleInfo(characterData) {

	var html = "<div class=\"col-xs-12\">";

	var ac = generateColWell(4,"armour","Armour Class",characterData["armourClass"]);
	var init = generateColWell(4,"init","Initiative",characterData["initiative"]);
	var spd = generateColWell(4,"speed","Speed",characterData["speed"]);
	html += generateRowWithContent(ac+init+spd);

	var max = generateColWell(4,"maxHP","Maximum HP",characterData["maxHP"]);
	var curr = generateColWell(4,"currHP","Current HP",characterData["currHP"]);
	var temp = generateColWell(4,"tempHP","Temporary HP",characterData["tempHP"]);
	html += generateRowWithContent(max+curr+temp);

	var hit = generateColWell(4,"hitDice","Hit Dice",characterData["hitDice"]);
	var ds = generateColWell(8,"deathSaves","Death Saves",characterData["deathSaves"]);
	html += generateRowWithContent(hit+ds);

	html += "</div>";
	return html;
}

function generateCharacterTraits(characterData) {

	var html = "<div class=\"col-xs-12\">";

	var personal = generateColWell(3,"personalTraits","Personal Traits",characterData["personalTraits"]);
	var ideals = generateColWell(3,"ideals","Ideals",characterData["ideals"]);
	var bonds = generateColWell(3,"bonds","Bonds",characterData["bonds"]);
	var flaws = generateColWell(3,"flaws","Flaws",characterData["flaws"]);
	html += generateRowWithContent(personal+ideals+bonds+flaws);

	html += "</div>";
	return html;
}

function generateRowWithContent(content) {

	var html = "<div class=\"row\">";
	html += content;
	html += "</div>";
	return html;
}

//dndObj Class w/ functions above
function dndObj() {
	this.populateCharacter = populateCharacterFields;
}

var dndPopulate = new dndObj();
