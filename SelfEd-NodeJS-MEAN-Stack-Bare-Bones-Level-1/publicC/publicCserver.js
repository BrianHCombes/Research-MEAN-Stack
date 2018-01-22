// set up ======================================================================
var express  = require('express');
var app      = express();                       // create our app w/ express

//var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 8080; 				// set the port
//var database = require('./config/database'); 			// load the database config

//var morgan = require('morgan'); 		// log requests to the console (express4)
//var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
//var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration ===============================================================
//mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

//app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(express.static(__dirname)); 				// set the static files location /public/img will be /img for users
//app.use(morgan('dev')); 										// log every request to the console
//app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
//app.use(bodyParser.json()); 									// parse application/json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//app.use(methodOverride());

// routes ======================================================================
//require('./public/routes.js')(app);
require('./publicCroutes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port,'localhost');
console.log("App listening on port " + port + " -> Enter the following in your browser: ------------------------------------- http://127.0.0.1:" + port);