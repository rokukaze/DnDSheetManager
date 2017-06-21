var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dnd_url = "mongodb://localhost:27017/dnd";
var express = require('express');
var app = express();


//========== Database functions ==========

var playerQuery = function(response,dbUrl,playerName) {

        MongoClient.connect(dbUrl,function(err,db) {

		if( err == null )
		{
			var cursor = db.collection('characters').find({"name":playerName}).toArray( function(err,doc) {
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
				console.log(doc);
				assert.equal(err,null);
				if( doc != null ) { 
					playersBack.push(doc);
					players = doc['players'];
					db.close();
					console.log("============");
					console.log(players);
					console.log("============");
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

var parsePlayerInfo = function(playerInfo) {

	var info = {};

	if( "name" in playerInfo & "hp" in playerInfo )
	{
		info["name"] = playerInfo["name"];
		info["hp"] = playerInfo["hp"];

		return info;
	}
	else
	{
		return null;
	}
}

var parseCommand = function(response,dbUrl,command) {

	var msg = "received command " + command + "\n";

	if( command["command"] == "add-player" & "info" in command )
	{
		var playerInfo = parsePlayerInfo(command["info"]);

		if( playerInfo != null )
		{

			MongoClient.connect(dbUrl,function(err,db) {

				if( err == null )
				{
					db.collection('characters').insertOne({
						//top char block
						"charname":playerInfo["charname"],
						"class":playerInfo["class"],
						"level":playerInfo["level"],
						"race":playerInfo["race"],
						"playername":playerInfo["playername"],
						"background":playerInfo["background"],
						"alignment":playerInfo["alignment"],
						"xp":playerInfo["xp"],
						//mid and left char block
						"currenthp":playerInfo["currenthp"],
						"maxhp":playerInfo["maxhp"],
						"temphp":playerInfo["temphp"],
						"hitdice":playerInfo["hitdice"],
						"ac":playerInfo["ac"],
						"initiative":playerInfo["initiative"],
						"speed":playerInfo["speed"],
						"str":playerInfo["str"],
						"dex":playerInfo["dex"],
						"con":playerInfo["con"],
						"int":playerInfo["int"],
						"wis":playerInfo["wis"],
						"cha":playerInfo["cha"],
						"profbonus":playerInfo["profbonus"],
						"maxweight":playerInfo["maxweight"],
						"classresource":playerInfo["classresource"],
						//add traits, ideals, bonds, flaws, inspiration?
						//add proficiencies and languages?
						//add features traits?
						// add equipment block?
						"cp":playerInfo["cp"],
						"sp":playerInfo["sp"],
						"ep":playerInfo["ep"],
						"gp":playerInfo["gp"],
						"pp":playerInfo["pp"]
					}, function(err, result) {

						if( err == null )
						{
							response.send("command: add-player, successfully added player\n");
						}
						else
						{
							response.send("command: add-player, error: db error - could not insert player\n");
						}
					});
				}
				else
				{
					response.send("command: add-player, error: db error\n");
				}
			});
		}
		else
		{
			response.send("command: add-player, error: invalid player information given\n");
		}

	}
	else
	{
		response.send(msg);
	}
}


//========== REST functions ==========

app.get('/player/:name', function(request, response) {

	response.header("Access-Control-Allow-Origin","*");
	var msg = "received request - stats for player: " + request.params.name;
	console.log(msg);
	playerQuery(response,dnd_url,request.params.name);
})

app.get('/campaign/:name', function(request, response) {

	response.header("Access-Control-Allow-Origin","*");
	var msg = "received request - stats for campaign: " + request.params.name;
	console.log(msg);
	campaignQuery(response,dnd_url,request.params.name);
})

app.put('/command', function(request, response) {

	console.log("received command upload request");
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

        console.log("Listening to port:", port)
});
