var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dnd_url = "mongodb://localhost:27017/dnd";
var express = require('express');
var app = express();
var fs = require("fs");
var serverStatus = "development";

var logMessage = function(message) {

	var logPath = "/home/ubuntu/nodeLogs";

	if( serverStatus == "production" )
	{
		fs.appendFile(logPath,message+"\n",function(err){});
	}
	else
	{
		console.log(message);
	}
}

var responseAddToCollectionError = function(response,collection,error) {

	var msg = "command: add-"+collection.slice(0,-1)+", error: "+error+"\n";
	response.send(msg);
}

//========== Database functions ==========

var dbQuery = function(response,dbUrl,collection,query) {

        MongoClient.connect(dbUrl,function(err,db) {

		if( err == null )
		{
			var cursor = db.collection(collection).find(query).toArray( function(err,doc) {
				assert.equal(err,null);
				if( doc != null ) { 
					if( doc.length == 0 )
					{
						response.send("empty query");
					}
					else
					{
						response.send(doc);
					}
				}   
				db.close();
			}); 
		}
		else
		{
			response.send("Database error");
		}

        });
}

var verifyQuery = function(query,keys) {

//	for( keyIndex in keys )
//	{
//		if( !(keys[keyIndex] in query) )
//		{
//			return false;
//		}
//	}

	return true;
}

var characterQuery = function(response,dbUrl,query) {

	var primaryKeys = ["name","player","campaign"];
	if( verifyQuery(query,primaryKeys) )
	{
		dbQuery(response,dbUrl,"characters",query);
	}
	else
	{
		response.send("query character: missing primary keys, requires keys "+JSON.stringify(primaryKeys));
	}
}

var playerQuery = function(response,dbUrl,query) {

	var primaryKeys = ["player"];
	if( verifyQuery(query,primaryKeys) )
	{
		dbQuery(response,dbUrl,"player",query);
	}
	else
	{
		response.send("query player: missing primary keys, requires keys "+JSON.stringify(primaryKeys));
	}
}

var campaignQuery = function(response,dbUrl,query) {

	var primaryKeys = ["dungeonMaster","campaign"];
	if( verifyQuery(query,primaryKeys) )
	{
		dbQuery(response,dbUrl,"campaigns",query);
	}
	else
	{
		response.send("query campaign: missing primary keys, requires keys "+JSON.stringify(primaryKeys));
	}
}

//========== Parse functions ==========

var parseCharacterInfo = function(characterInfo) {

	if( "name" in characterInfo )
	{
		return characterInfo;
	}
	else
	{
		return null;
	}
}

var parsePlayerInfo = function(playerInfo) {

	if( "player" in playerInfo )
	{
		return playerInfo;
	}
	else
	{
		return null;
	}
}

var parseCampaignInfo = function(campaignInfo) {

	if( "campaign" in campaignInfo )
	{
		return campaignInfo;
	}
	else
	{
		return null;
	}
}

var addToCollection = function(response,dbUrl,collection,doc) {

	MongoClient.connect(dbUrl,function(err,db) {

		if( err == null )
		{
			try {
				db.collection(collection).insertOne(
					doc,
					function(err, result) {

						if( err == null )
						{
							var msg = "command: add-"+collection+", success\n";
							response.send(msg);
						}
						else
						{
							responseAddToCollectionError(response,collection,err);
						}
					}
				);

			} catch (e) {
				responseAddToCollectionError(response,collection,e);
			};
		}
		else
		{
			responseAddToCollectionError(response,collection,err);
		}
	});
}

var parseAddCharacterCommand = function(response,dbUrl,command) {

	if( "characterInfo" in command["info"] && "playerInfo" in command["info"] && "campaignInfo" in command["info"] )
	{
		var characterInfo = parseCharacterInfo(command["info"]["characterInfo"]);
		var playerInfo = parsePlayerInfo(command["info"]["playerInfo"]);
		var campaignInfo = command["info"]["campaignInfo"];

		characterInfo["player"] = playerInfo["player"];
		characterInfo["campaign"] = campaignInfo["campaign"];

		addToCollection(response,dbUrl,"characters",characterInfo);
	}
	else
	{
		response.send("command: add-character, error: invalid character information given\n");
	}
}

var parseAddPlayerCommand = function(response,dbUrl,command) {

	if( "playerInfo" in command["info"] )
	{
		var playerInfo = parsePlayerInfo(command["info"]["playerInfo"]);

		addToCollection(response,dbUrl,"players",playerInfo);
	}
	else
	{
		response.send("command: add-player, error: invalid player information given\n");
	}
}

var parseAddCampaignCommand = function(response,dbUrl,command) {

	if( "campaignInfo" in command["info"] )
	{
		var campaignInfo = parseCampaignInfo(command["info"]["campaignInfo"]);

		addToCollection(response,dbUrl,"campaigns",campaignInfo);
	}
	else
	{
		response.send("command: add-campaign, error: invalid campaign information given\n");
	}
}

var parseCommand = function(response,dbUrl,command) {

	if( command != null && "command" in command && "info" in command )
	{
		console.log(command["command"]);
		if( command["command"] == "add-character" )
		{
			parseAddCharacterCommand(response,dbUrl,command);
		}
		else if( command["command"] == "add-player" )
		{
			parseAddPlayerCommand(response,dbUrl,command);
		}
		else if( command["command"] == "add-campaign" )
		{
			parseAddCampaignCommand(response,dbUrl,command);
		}
		else
		{
			var msg = "received invalid command " + command["command"] + "\n";
			response.send(msg);
		}
	}
	else
	{
		response.send("command error - no command uploaded");
	}
}

//========== REST functions ==========

app.get('/character', function(request, response) {

	response.header("Access-Control-Allow-Origin","*");
	var msg = "received request - query character: " + JSON.stringify(request.query);
	logMessage(msg);
	characterQuery(response,dnd_url,request.query);
})

app.get('/player', function(request, response) {

	response.header("Access-Control-Allow-Origin","*");
	var msg = "received request - query player: " + JSON.stringify(request.query);
	logMessage(msg);
	playerQuery(response,dnd_url,request.query);
})

app.get('/campaign', function(request, response) {

	response.header("Access-Control-Allow-Origin","*");
	var msg = "received request - query campaign: " + JSON.stringify(request.query);
	logMessage(msg);
	campaignQuery(response,dnd_url,request.query);
})

app.put('/command', function(request, response) {

	logMessage("received command upload request");
	var body = [];

	request.on('data',function(chunk) {
		// callback for reading data that's being uploaded
		// place all data chunks in buffer
		body.push(chunk);

	}).on('end', function() {
		try {
			// callback when we're done reading uploaded data
			// assume that data uploaded is string, so we can easily convert the data into a string
			var command = JSON.parse(body.toString());
			// send command to parser
			parseCommand(response,dnd_url,command);
		}
		catch (e) {
			response.send("Error: Incorrect JSON object - "+e+"\n");
		}
	});
})

//==========  Node server ==========

var server = app.listen(18080, function() {
        var host = server.address().address
        var port = server.address().port

        logMessage("Listening to port:"+port)
	MongoClient.connect(dnd_url,function(err,db) {

		db.collection("status").findOne({},function(err,doc) {
			serverStatus = doc["status"];
			logMessage("Server status:"+serverStatus);
		});
	});
});
