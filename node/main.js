var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dnd_url = "mongodb://localhost:27017/dnd";
var express = require('express');
var app = express();
var fs = require("fs");

var logMessage = function(message) {

	var logPath = "/home/ubuntu/nodeLogs";

	fs.appendFile(logPath,message+"\n",function(err){});
}

//========== Database functions ==========

var characterQuery = function(response,dbUrl,characterName) {

        MongoClient.connect(dbUrl,function(err,db) {

		if( err == null )
		{
			var cursor = db.collection('characters').find({"name":characterName}).toArray( function(err,doc) {
				assert.equal(err,null);
				if( doc != null ) { 
					response.send(doc[0]);
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

var campaignQuery = function(response,dbUrl,campaignName) {

	var playersBack = [];
	var players;

        MongoClient.connect(dbUrl,function(err,db) {

		if( err == null )
		{
			var cursor = db.collection('campaigns').findOne({"name":campaignName},function(err,doc) {
				logMessage(doc);
				assert.equal(err,null);
				if( doc != null ) { 
					playersBack.push(doc);
					players = doc['players'];
					db.close();
					logMessage("============");
					logMessage(players);
					logMessage("============");
					MongoClient.connect(dbUrl,function(err,db) {

						if( err == null )
						{
							var playerPull = db.collection('characters').find({}).toArray(function(err,doc) {
								assert.equal(err,null);
								if( doc != null ) {
									playersBack.push(doc);
									response.send(playersBack);
								}   
								db.close();
							});
						}
						else
						{
							response.send("Database error");
							return;
						}
					});
				}
			});
		}		
		else
		{
			response.send("Database error");
			return;
		}
	});

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

var parseGameInfo = function(gameInfo) {

	if( "game" in gameInfo )
	{
		return gameInfo;
	}
	else
	{
		return null;
	}
}

var parseAddCharacterCommand = function(response,dbUrl,command) {

	var characterInfo = parseCharacterInfo(command["info"]["characterInfo"]);
	var playerInfo = parsePlayerInfo(command["info"]["playerInfo"]);
	var gameInfo = command["info"]["gameInfo"];

	if( characterInfo != null && playerInfo != null && gameInfo != null )
	{
		MongoClient.connect(dbUrl,function(err,db) {

			if( err == null )
			{
				characterInfo["player"] = playerInfo["player"];
				characterInfo["game"] = gameInfo["game"];

				try {
					db.collection('characters').insertOne(
						characterInfo,
						function(err, result) {

							if( err == null )
							{
								response.send("command: add-character, successfully added character\n");
							}
							else
							{
								response.send("command: add-character, error: db error - could not insert character\n");
							}
						}
					);

				} catch (e) {
					var err = "command: add-character, error:" + e;
					response.send(err);
				};

			}
			else
			{
				response.send("command: add-character, error: db error\n");
			}
		});
	}
	else
	{
		response.send("command: add-character, error: invalid character information given\n");
	}
}

var parseCommand = function(response,dbUrl,command) {

	var msg = "received command " + command + "\n";

	if( command != null )
	{
		if( command["command"] == "add-character" & "info" in command )
		{
			parseAddCharacterCommand(response,dbUrl,command);
		}
		else
		{
			response.send(msg);
		}
	}
	else
	{
		response.send("command error - no command uploaded");
	}
}

//========== REST functions ==========

app.get('/player/:name', function(request, response) {

	response.header("Access-Control-Allow-Origin","*");
	var msg = "received request - stats for player: " + request.params.name;
	logMessage(msg);
	characterQuery(response,dnd_url,request.params.name);
})

app.get('/campaign/:name', function(request, response) {

	response.header("Access-Control-Allow-Origin","*");
	var msg = "received request - stats for campaign: " + request.params.name;
	logMessage(msg);
	campaignQuery(response,dnd_url,request.params.name);
})

app.put('/command', function(request, response) {

	logMessage("received command upload request");
	var body = [];

	request.on('data',function(chunk) {
		// callback for reading data that's being uploaded
		// place all data chunks in buffer
		body.push(chunk);

	}).on('end', function() {
		// callback when we're done reading uploaded data
		// assume that data uploaded is string, so we can easily convert the data into a string
		var command = JSON.parse(body.toString());

		// send command to parser
		parseCommand(response,dnd_url,command);
	});
})

//==========  Node server ==========

var server = app.listen(18080, function() {
        var host = server.address().address
        var port = server.address().port

        logMessage("Listening to port:"+port)
});
