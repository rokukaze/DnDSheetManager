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

//========== REST functions ==========

app.get('/player/:name', function(request, response) {

        response.header("Access-Control-Allow-Origin","*");
	var msg = "received request - stats for player: " + request.params.name;
	console.log(msg);
	playerQuery(response,dnd_url,request.params.name);
})

//==========  Node server ==========

var server = app.listen(18080, function() {
        var host = server.address().address
        var port = server.address().port

        console.log("Listening to port:", port)
});
