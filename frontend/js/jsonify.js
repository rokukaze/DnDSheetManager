//Todo
function jsonifyCharacter(){

	var jsonifiedChar = "{\"command\":\"add-character\",\"info\":{\"characterInfo\":{";
	var player = document.getElementById("add-character-player").value;
	var campaign = "";//add campaign field to pull from? how to pull from dropdown?
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

	var JSONFieldString = "";
	var fieldValue;

	try {
		if(fieldName == null && JSONFieldName == null){ //not needed?
			fieldValue = ",";
		}else{
			fieldValue = document.getElementById(fieldName).value;
			JSONFieldString += "\"" + JSONFieldName + "\":";
			JSONFieldString += "\"" + fieldValue + "\""; //need to add comma
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