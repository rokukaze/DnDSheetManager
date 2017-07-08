//Populate all fields on the page
function populateDNDFields(characterData) {

	console.log("Populating fields");
	for (var field in characterData) {
		this.obtainJSON(field, characterData);
	}
	console.log("Populating fields complete");
}

//Gets JSON field and puts the value into a field of THE SAME NAME 
//(could be made better such that the json field and the html field can be different)
function grabJSONField(JSONFieldName, characterData) {

	var fieldName = characterData[JSONFieldName];
	console.log("Retriving JSON Field " + JSONFieldName);
	try {
		if (fieldName == null) {
			document.getElementById(JSONFieldName).innerHTML = JSONFieldName;
		} else {
			document.getElementById(JSONFieldName).innerHTML = fieldName;
		}
	} catch (err) {
		console.log(err);
		//usually because the inner html field is null (no such id or campaign field ATM)
	}
}

//dndObj Class w/ functions above
function dndObj() {
	this.populateHTML = populateDNDFields;
	this.obtainJSON = grabJSONField;
}

var dndPopulate = new dndObj();