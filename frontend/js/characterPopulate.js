// HTML Generation
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


        if( addValue )
        {
                var name = generate.colWell(3,"character-name","Character Name",characterData["name"],addValue);
                var campaignDropdown = "<select><option value=\"\">None</option></select>";
                var campaignHTML = generate.colWell(3,"character-add-campaign","Campaign",campaignDropdown,false);
                var baseSheetDropdown = "<select><option value=\"\">None</option></select>";
                var baseSheetHTML = generate.colWell(3,"base-character-sheet","Base Character Sheet",baseSheetDropdown,false);
                var addPlayerButton = "<input type=\"button\" onclick=\"dndDb.sendCommandToDB(jsonifyCharObj.jsonifyCharacter(), dndCallbacks.sendSuccess)\" value=\"Add Character\">";
                //Note add player button is not implemented currently
                var buttonHTML = generate.colWell(3,"character-add-submit","Done?",addPlayerButton,false);

                html += generate.rowContent(null,name+campaignHTML+baseSheetHTML+buttonHTML);
        }
        else
        {
                var name = generate.colWell(4,"name","Character Name",characterData["name"],addValue);
                html += generate.rowContent(null,name);
        }

        var level = generate.colWell(3,"character-classAndLevel","Class & Level",characterData["classAndLevel"],addValue);
        var player = generate.colWell(3,"character-player","Player Name",characterData["player"],addValue);
        var background = generate.colWell(3,"character-background","Background",characterData["background"],addValue);
        var faction = generate.colWell(3,"character-faction","Faction",characterData["faction"],addValue);
        html += generate.rowContent(null,level+player+background+faction);

        var race = generate.colWell(3,"character-race","Race",characterData["race"],addValue);
        var alignment = generate.colWell(3,"character-alignment","Alignment",characterData["alignment"],addValue);
        var xp = generate.colWell(3,"character-xp","Experience Points",characterData["xp"],addValue);
        var dci = generate.colWell(3,"character-dci","DCI Number",characterData["dci"],addValue);
        html += generate.rowContent(null,race+alignment+xp+dci);

        html = generate.rowContent("character-header",generate.colContent(null,12,html));

        return html;
}

function generateCharacterAttributes(characterData,addValue) {

        var html = "";

        var str = generate.colWell(2,"character-strength","Strength",characterData["strength"],addValue);
        var dex = generate.colWell(2,"character-dexterity","Dexterity",characterData["dexterity"],addValue);
        var cons = generate.colWell(2,"character-constitution","Constitution",characterData["constitution"],addValue);
        var intel = generate.colWell(2,"character-intelligence","Intelligence",characterData["intelligence"],addValue);
        var wis = generate.colWell(2,"character-wisdom","Wisdom",characterData["wisdom"],addValue);
        var cha = generate.colWell(2,"character-charisma","Charisma",characterData["charisma"],addValue);
        html += generate.rowContent(null,str+dex+cons+intel+wis+cha);

        html = generate.rowContent("character-attributes",generate.colContent(null,12,html));

        return html;
}

function generateCharacterBattleInfo(characterData,addValue) {

        var html = "";

        var ac = generate.colWell(4,"character-armourClass","Armour Class",characterData["armourClass"],addValue);
        var init = generate.colWell(4,"character-initiative","Initiative",characterData["initiative"],addValue);
        var spd = generate.colWell(4,"character-speed","Speed",characterData["speed"],addValue);
        html += generate.rowContent(null,ac+init+spd);

        var max = generate.colWell(4,"character-maxHP","Maximum HP",characterData["maxHP"],addValue);
        var curr = generate.colWell(4,"character-currHP","Current HP",characterData["currHP"],addValue);
        var temp = generate.colWell(4,"character-tempHP","Temporary HP",characterData["tempHP"],addValue);
        html += generate.rowContent(null,max+curr+temp);

        var hit = generate.colWell(4,"character-hitDice","Hit Dice",characterData["hitDice"],addValue);
        var ds = generate.colWell(8,"character-deathSaves","Death Saves",characterData["deathSaves"],addValue);
        html += generate.rowContent(null,hit+ds);

        html = generate.rowContent("character-battle-info",generate.colContent(null,12,html));

        return html;
}

function generateCharacterTraits(characterData,addValue) {

        var html = "";

        var personal = generate.colWell(3,"character-personalTraits","Personal Traits",characterData["personalTraits"],addValue);
        var ideals = generate.colWell(3,"character-ideals","Ideals",characterData["ideals"],addValue);
        var bonds = generate.colWell(3,"character-bonds","Bonds",characterData["bonds"],addValue);
        var flaws = generate.colWell(3,"character-flaws","Flaws",characterData["flaws"],addValue);
        html += generate.rowContent(null,personal+ideals+bonds+flaws);

        html = generate.rowContent("character-traits",generate.colContent(null,12,html));

        return html;
}

// HTML population
function populateCharacterDisplay(characterData) {

        console.log("Populating character fields");
        document.getElementById("character-display").innerHTML = generateCharacterInfo(characterData,false);
}

function populateCharacterAdd(characterData) {

        console.log("Populating add character fields");
        document.getElementById("character-display").innerHTML = generateCharacterInfo(characterData,true);
}

function characterDisplay() {
	this.populateCharacterDetails = populateCharacterDisplay;
	this.populateCharacterAdd = populateCharacterAdd;
}

var dndCharacter = new characterDisplay();
