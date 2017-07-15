//Todo
function jsonifyCharacter(){

	var htmlCharFields = document.getElementsByClassName("add-character-value");

	 for(var i = 0;i < htmlCharFields.length;i++){//why does for var field in htmlcharfields not work?
		console.log(htmlCharFields[i].id);
        console.log(htmlCharFields[i].value);
    }

	var dictChar = {}; //contains command and info
	dictChar["command"] = "add-character";
	dictChar["info"] = infoDict; //use this or dictChar.info = infoDict? difference?

	var infoDict = {}; //contains charinfo, playerinfo and campaigninfo
	infoDict["characterInfo"] = charInfoDict;
	infoDict["playerInfo"] = playerInfoDict;
	infoDict["campaignInfo"] = campaignInfoDict;
	
	var charInfoDict = {};
	charInfoDict["name"] = document.getElementById("add-character-name").value;//has to be a better way
	charInfoDict["classAndLevel"] = document.getElementById("add-character-classAndLevel").value;
	charInfoDict["background"] = document.getElementById("add-character-background").value;
	charInfoDict["faction"] = document.getElementById("add-character-faction").value;
	charInfoDict["race"] = document.getElementById("add-character-race").value;
	charInfoDict["alignment"] = document.getElementById("add-character-alignment").value;
	charInfoDict["xp"] = document.getElementById("add-character-xp").value;
	charInfoDict["strength"] = document.getElementById("add-character-strength").value;
	charInfoDict["dexterity"] = document.getElementById("add-character-dexterity").value;
	charInfoDict["constitution"] = document.getElementById("add-character-constitution").value;
	charInfoDict["intelligence"] = document.getElementById("add-character-intelligence").value;
	charInfoDict["wisdom"] = document.getElementById("add-character-wisdom").value;
	charInfoDict["charisma"] = document.getElementById("add-character-charisma").value;
	charInfoDict["armourClass"] = document.getElementById("add-character-armourClass").value;
	charInfoDict["initiative"] = document.getElementById("add-character-initiative").value;
	charInfoDict["speed"] = document.getElementById("add-character-speed").value;
	charInfoDict["maxHP"] = document.getElementById("add-character-maxHP").value;
	charInfoDict["currHP"] = document.getElementById("add-character-currHP").value;
	charInfoDict["tempHP"] = document.getElementById("add-character-tempHP").value;
	charInfoDict["hitDice"] = document.getElementById("add-character-hitDice").value;
	charInfoDict["deathSaves"] = document.getElementById("add-character-deathSaves").value;
	charInfoDict["personalTraits"] = document.getElementById("add-character-personalTraits").value;
	charInfoDict["ideals"] = document.getElementById("add-character-ideals").value;
	charInfoDict["bonds"] = document.getElementById("add-character-bonds").value;
	charInfoDict["flaws"] = document.getElementById("add-character-flawsname").value;

	var playerInfoDict = {};
	playerInfoDict["player"] = document.getElementById("add-character-player").value; 

	var campaignInfoDict = {};
	campaignInfoDict["campaign"] = document.getElementById("add-character-campaign").value;

	//current functional code below--------------------------------------------

	var jsonifiedChar = "{\"command\":\"add-character\",\"info\":{\"characterInfo\":{";
	var player = document.getElementById("add-character-player").value;
	var campaign = document.getElementById("add-character-name");//add campaign field to pull from? how to pull from dropdown?
	var comma = ",";

	jsonifiedChar += jsonifyField("add-character-name", "name");
	jsonifiedChar += comma;
	jsonifiedChar += jsonifyField("add-character-classAndLevel", "classAndLvl");
	jsonifiedChar += "},\"playerInfo\":{\"player\":\"" + player + "\"},\"campaignInfo\":{\"campaign\":\"Campaign1\"}}}"; //need to change campaign
	

	console.log(jsonifiedChar); //just substract comma at end instead?

	return jsonifiedChar;
	//json stringify to send
}

function jsonifyField(fieldName, JSONFieldName){

	var JSONFieldString = document.getElementById("add-character-name");
	var fieldValue;

	try {
		if(fieldName == null && JSONFieldName == null){ //not needed?
			fieldValue = ",";
		}else{
			fieldValue = document.getElementById(fieldName).value;
			JSONFieldString += "\"" + JSONFieldName + "\":";
			JSONFieldString += "\"" + fieldValue + document.getElementById("add-character-name"); //need to add comma
			console.log(JSONFieldString);
		}
		return JSONFieldString;
	} catch (err) {
		console.log(err);
	}
}

//Class with class functions above
function jsonifyObj() {
	this.jsonifyCharacter = jsonifyCharacter;//probably dont need only for a single function 
}

var jsonifyCharObj = new jsonifyObj();