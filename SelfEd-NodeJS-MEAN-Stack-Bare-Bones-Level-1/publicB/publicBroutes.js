var fs = require("fs");

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	
	app.get('/api/publicB', function(req, res) {
            
            // fs.read(__dirname + "/" + "publicBJSON.json", "utf8", function(err,data){        // Does not work    - fs.read is deprecated
            // fs.readFile(__dirname + "/" + "publicBJSON.json", "utf8", function(err,data){    // Works               
            // fs.readFile("publicBJSON.json", "utf8", function(err,data){                      // Works
            // fs.readFile("./publicBJSON.json", "utf8", function(err,data){                    // Works
            
            fs.readFile("./publicBJSON.json", "utf8", function(err,data){    
                if (err) {
                    return console.error(err);
                }
                
                dataA = JSON.parse(data);
                console.log(dataA[1].msg);
                res.json(dataA);
            });
	});

        
	app.get('./index.html', function(req, res) {
		res.sendFile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
        

// http://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
        
};