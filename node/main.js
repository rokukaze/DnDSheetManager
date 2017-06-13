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
//==========  Node server ==========

var server = app.listen(18080, function() {
        var host = server.address().address
        var port = server.address().port

        console.log("Listening to port:", port)
});
