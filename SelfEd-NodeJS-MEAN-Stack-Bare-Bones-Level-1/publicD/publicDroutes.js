var fs = require("fs");

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	
	app.get('/api/publicD/:param1/:param2', function(req, res) {
            
            var paramObj = req.params; // param1 in the URL above is the name of the name:value pair and the received construct is the value
            
            // paramObj = JSON.parse(paramObj);
            // fs.read(__dirname + "/" + "publicBJSON.json", "utf8", function(err,data){        // Does not work    - fs.read is deprecated
            // fs.readFile(__dirname + "/" + "publicBJSON.json", "utf8", function(err,data){    // Works               
            // fs.readFile("publicBJSON.json", "utf8", function(err,data){                      // Works
            // fs.readFile("./publicBJSON.json", "utf8", function(err,data){                    // Works
            
            fs.readFile("./publicDJSON.json", "utf8", function(err,data){    
                if (err) {
                    return console.error(err);
                }
                
                dataA = JSON.parse(data);
                
                dataA.push({"msg":"This is param1 value >>>>: " + paramObj.param1 + " <<<< which is a primitive and was passed from the client side and returned"});
                dataA.push({"msg":"This is param2 value >>>>: " + paramObj.param2 + " <<<< which is an object and was passed from the client side and returned"});
                
               // console.log("The value from the JSON file is: " + dataA.msg2.msgB);
                console.log("The first parameter is: " + paramObj.param1);
                console.log("The second parameter received is an object, it is: " + paramObj.param2 + " and the value of the object is: "+ JSON.parse(paramObj.param2).objPropertyName);
                console.log(dataA);
                res.json(dataA);
            });
	});


        
	app.get('*', function(req, res) {
		res.sendFile(__dirname + '/publicDindex.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
        


// http://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
        
};