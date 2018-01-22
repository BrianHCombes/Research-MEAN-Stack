var fs = require("fs");

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	
	app.get('/api/publicE/:param1', function(req, res) {
            
            var paramObj = req.params; // param1 in the URL above is the name of the name:value pair and the received construct is the value
            var dataA = {};
            // paramObj = JSON.parse(paramObj);
            // fs.read(__dirname + "/" + "publicEJSON.json", "utf8", function(err,data){        // Does not work    - fs.read is deprecated
            // fs.readFile(__dirname + "/" + "publicEJSON.json", "utf8", function(err,data){    // this syntax works               
            // fs.readFile("publicEJSON.json", "utf8", function(err,data){                      // this syntax works
            // fs.readFile("./publicEJSON.json", "utf8", function(err,data){                    // this syntax works
            
            fs.readFile("./publicEJSON1.json", "utf8", function(err,data){    
                if (err) {
                    return console.error(err);
                }
                
                dataA = JSON.parse(data);
                //dataA["msg6"] = JSON.parse(paramObj.param1).msg6;     // add record - this syntax works
                //dataA.msg7 = JSON.parse(paramObj.param1).msg7;        // add record - this syntax works
                //dataA.msg8 = JSON.parse(paramObj.param1)["msg8"];     // add record - this syntax works
                dataA["msg9"] = JSON.parse(paramObj.param1)["msg9"];    // add record - this syntax works
                
                console.log();console.log();console.log();
                console.log("*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+");
                console.log("These are two ways to show the same selected property:");
                console.log();
                //console.log("The value from the parsed JSON file is: " + dataA.msg7.msgA);
                //console.log("The value from the parameter object is: " + JSON.parse(paramObj.param1).msg7.msgA); // How to access an individual property
                console.log();
                res.json(dataA); // Sends parsed data set back to the client
                console.log("*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+");
                writeData(dataA); // 
            });
            
           
            var writeData = function(dataA){
                fs.writeFile('publicEJSON1.json', JSON.stringify(dataA), function(err) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#');
                    console.log('The file has been updated, saved and sent to the client. It is:');
                    console.log();
                    console.log('This below is parsed');
                    console.log(dataA);
                    console.log();
                    console.log('This below is stringified ------------ and is the proper format when saving as a file');
                    console.log(JSON.stringify(dataA));
                  });    
              };
            
	});
        
	app.get('*', function(req, res) {
		res.sendFile(__dirname + '/publicEindex.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
        


// http://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
        
};