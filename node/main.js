var express = require('express');
var app = express();

app.get('/test/:var1/:var2', function(request, response) {
        response.header("Access-Control-Allow-Origin","*");
        console.log("param ",request.params.var1);
	response.send("test");
})

var server = app.listen(18080, function() {
        var host = server.address().address
        var port = server.address().port

        console.log("Listening to port:", port)
});
