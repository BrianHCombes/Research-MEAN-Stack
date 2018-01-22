
module.exports = function(app) {

	// api ---------------------------------------------------------------------
	
	app.get('/api/todos', function(req, res) {

            var StrA = [{"msg":"This is the Data Element 0 from folder publicA"}, {"msg":"This is the Data Element 1 from folder publicA"}, {"msg":"This is the Data Element 2 from folder publicA"}, {"msg":"This is the Data Element 3 from folder publicA - Locally"}];
            console.log(JSON.stringify(StrA[2].msg));
            res.json(StrA);
	});

        
	app.get('./index.html', function(req, res) {
		res.sendFile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
        

// http://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
        
};