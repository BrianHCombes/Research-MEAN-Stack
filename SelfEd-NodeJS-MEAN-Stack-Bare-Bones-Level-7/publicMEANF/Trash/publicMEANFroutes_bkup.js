// var fs = require("fs");
// var msgmeana = require('../../app/controllers-for-DB/dbMEANF.server.controller');
var msgmeana = require('../controllers-for-DB/dbMEANF.server.controller');


module.exports = function(app) {


        console.log("This is the proper route file");
	// api ---------------------------------------------------------------------
	
        // --- app.route('/api').post(msgmeana.addDoc);
        
        // --- app.route('/api').get(msgmeana.listDocs);
        app.route('/api/todos/get/all').get(msgmeana.listDocs);
        
        app.route('/api/todos/configobj').post(msgmeana.addDocByConfigObj);               // works
        app.route('/api/todos/urlparam/:postParam').post(msgmeana.addDocByUrlParam);      // works
        
        app.route('/api/todos/delDoc/req/?').delete(msgmeana.deleteDocViaReqQueryObj);    // works
        
        app.route('/api/todos/del/urlparam/:deleteParam').delete(msgmeana.deleteDocByUrlParam); // works
        
        app.route('/api/todos/getDoc/url/:docParam').get(msgmeana.getDocViaUrlParam); // works
        
        app.route('/api/todos/getDoc/req/?').get(msgmeana.getDocViaReqQueryObj); // works
        //
// Used to assure parameter data was making it here from < publicMEANFcore.js >
/*         
        app.delete('/api/todos/del/:params1', function(req, res){
            
            var paramObj = req.params;
            console.log("From the route file");
            console.log(paramObj.params1);
            
        });
*/
    
	app.get('../views/publicMEANFindex.html', function(req, res) {
		// res.sendFile('C:/School/SelfEd/SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-2/public_html/publicMEANF/publicMEANFindex.html'); // load the single view file (angular will handle the page changes on the front-end)
                res.sendFile('../views/publicMEANFindex.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
        


// http://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
        
};



/* 

var express = require('express');
var app = express();

app.get('../views/publicMEANFindex.html', function(req, res) {
		// res.sendFile('C:/School/SelfEd/SelfEd-NodeJS-MEAN-Stack-Bare-Bones-Level-2/public_html/publicMEANF/publicMEANFindex.html'); // load the single view file (angular will handle the page changes on the front-end)
                res.sendFile('../views/publicMEANFindex.html'); // load the single view file (angular will handle the page changes on the front-end)
	});


*/



// called by express.js