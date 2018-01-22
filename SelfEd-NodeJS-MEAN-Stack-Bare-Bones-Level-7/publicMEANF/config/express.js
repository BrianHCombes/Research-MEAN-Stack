// The original code had a function wrapped around all the < methods > 
// and < property > settings. I removed it and it all started 
// working better. See < ReadMe.txt > dated 5/13/17 and 5/14/17 for more
// details. 
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
require('../app/routes/publicMEANFroutes.js')(app); 
module.exports = app;

// called by publicMEANFserver.js