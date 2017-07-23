var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dnd_url = "mongodb://localhost:27017/dnd";
var express = require('express');
var app = express();
var fs = require("fs");
var serverStatus = "development";
var ObjectId = require('mongodb').ObjectId;

var logMessage = function(message) {

	var logPath = "/home/ubuntu/nodeLogs";

	if( serverStatus != "production" )
	{
		console.log(message);
	}

	fs.appendFile(logPath,message+"\n",function(err){});
}

var responseDBError = function(response,action,collection,error) {

	var msg = "command:"+action+"-"+collection.slice(0,-1)+", error: "+error+"\n";
	response.statusCode = 400;
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
						response.statusCode = 400;
						response.send("empty query");
					}
					else
					{
						response.statusCode = 200;
						response.send(doc);
					}
				}   
				db.close();
			}); 
		}
		else
		{
			response.statusCode = 500;
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
		response.statusCode = 400;
		response.send("query character: missing primary keys, requires keys "+JSON.stringify(primaryKeys));
	}
}

var playerQuery = function(response,dbUrl,query) {

	var primaryKeys = ["player"];
	if( verifyQuery(query,primaryKeys) )
	{
		dbQuery(response,dbUrl,"players",query);
	}
	else
	{
		response.statusCode = 400;
		response.send("query player: missing primary keys, requires keys "+JSON.stringify(primaryKeys));
	}
}

var campaignQuery = function(response,dbUrl,query) {

	var primaryKeys = ["dungeonMaster","campaign"];
	if( verifyQuery(query,primaryKeys) )
	{
		dbQuery(response,dbUrl,"requestCommand",query);
	}
	else
	{
		response.statusCode = 400;
		response.send("query campaign: missing primary keys, requires keys "+JSON.stringify(primaryKeys));
	}
}

var commandRequestQuery = function(response,dbUrl,query) {

	MongoClient.connect(dbUrl,function(err,db) {

		if( err == null )
		{
			var cursor = db.collection("requestCommand").find(query).toArray( function(err,doc) {
				assert.equal(err,null);
				if( doc != null ) { 
					if( doc.length == 1 )
					{
						parseCommandRequest(response,doc[0]);
						db.collection("requestCommand").deleteOne(query);
					}
					else if( doc.length > 1 )
					{
						response.statusCode = 400;
						response.send("invalid query - multiple commands");
					}
					else
					{
						response.statusCode = 400;
						response.send("expired/invalid command");
					}
				}   
				db.close();
			}); 
		}
		else
		{
			response.statusCode = 500;
			response.send("Database error");
		}

	});
}
//========== DB functions ==========

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
							var msg = "command: add-"+collection+" success";
							response.statusCode = 200;
							response.send(msg);
						}
						else
						{
							response.statusCode = 400;
							responseDBError(response,"add",collection,err);
						}
					}
				);

			} catch (e) {
				response.statusCode = 500;
				responseDBError(response,"add",collection,e);
			};
		}
		else
		{
			response.statusCode = 500;
			responseDBError(response,"add",collection,err);
		}
	});
}

var removeFromCollection = function(response,dbUrl,collection,doc) {

	MongoClient.connect(dbUrl,function(err,db) {

		if( err == null )
		{
			try {
				db.collection(collection).remove(
					doc,
					function(err, result) {

						if( err == null )
						{
							var msg = "command: remove-"+collection+" success";
							response.statusCode = 200;
							response.send(msg);
						}
						else
						{
							responseDBError(response,"remove",collection,err);
						}
					}
				);

			} catch (e) {
				responseDBError(response,"remove",collection,e);
			};
		}
		else
		{
			responseDBError(response,"remove",collection,err);
		}
	});
}

var removeFromCollectionRequest = function(response,dbUrl,collection,doc) {

	MongoClient.connect(dbUrl,function(err,db) {

		if( err == null )
		{
			try {
				var commandRequest = {
					"command":"remove",
					"collection":collection,
					"info":doc
				};

				db.collection("requestCommand").insertOne(
					commandRequest,
					function(err, result) {

						if( err == null )
						{
							var msg = "command: remove-"+collection+" request success\n - requestId:"+result["insertedId"];
							response.statusCode = 200;
							response.send(msg);
						}
						else
						{
							responseDBError(response,"remove",collection,err);
						}
					}
				);

			} catch (e) {
				responseDBError(response,"remove",collection,e);
			};
		}
		else
		{
			responseDBError(response,"remove",collection,err);
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
		response.statusCode = 400;
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
		response.statusCode = 400;
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
		response.statusCode = 400;
		response.send("command: add-campaign, error: invalid campaign information given\n");
	}
}

var parseRemoveCharacterCommand = function(response,dbUrl,command) {

	if( "characterInfo" in command["info"] && "playerInfo" in command["info"] && "campaignInfo" in command["info"] )
	{
		var characterInfo = parseCharacterInfo(command["info"]["characterInfo"]);
		var playerInfo = parsePlayerInfo(command["info"]["playerInfo"]);
		var campaignInfo = command["info"]["campaignInfo"];

		characterInfo["player"] = playerInfo["player"];
		characterInfo["campaign"] = campaignInfo["campaign"];

		removeFromCollectionRequest(response,dbUrl,"characters",characterInfo);
	}
	else
	{
		response.statusCode = 400;
		response.send("command: add-character, error: invalid character information given\n");
	}
}

var parseCommand = function(response,dbUrl,command) {

	if( command != null && "command" in command && "info" in command )
	{
		logMessage(command["command"]);
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
		else if( command["command"] == "remove-character" )
		{
			parseRemoveCharacterCommand(response,dbUrl,command);
		}
		else
		{
			var msg = "received invalid command " + command["command"] + "\n";
			response.statusCode = 400;
			response.send(msg);
		}
	}
	else
	{
		response.statusCode = 400;
		response.send("command error - no command uploaded");
	}
}

var parseCommandRequest = function(response,commandRequest) {

	if( commandRequest["command"] == "remove" )
	{
		removeFromCollection(response,dnd_url,commandRequest["collection"],commandRequest["info"]);
	}
	else
	{
		response.statusCode = 400;
		response.send("invalid command request");
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

app.get('/command/:player/:requestId', function(request, response) {

	response.header("Access-Control-Allow-Origin","*");
	var msg = "received request - run requested command";
	logMessage(msg);
	if( request.params.player != null && request.params.requestId != null )
	{
		var commandDetails = {"info.player":request.params.player,"_id":ObjectId(request.params.requestId)};
		commandRequestQuery(response,dnd_url,commandDetails);
	}
	else
	{
		response.statusCode = 400;
		response.send("incomplete request");
	}
})

app.use('/command',function(request,response,next) {

	response.header("Access-Control-Allow-Origin","*");
	response.header("Access-Control-Allow-Methods","PUT,OPTIONS");
	next();

})

app.put('/command', function(request, response) {

	logMessage("received command request");
	var body = [];

	request.on('data',function(chunk) {
		body.push(chunk);

	}).on('end', function() {
		try {
			var command = JSON.parse(body.toString());
			parseCommand(response,dnd_url,command);
		}
		catch (e) {
			response.statusCode = 400;
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
