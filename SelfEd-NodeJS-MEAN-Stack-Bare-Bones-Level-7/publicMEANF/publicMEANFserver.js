process.env.NODE_ENV = process.env.NODE_ENV || 'development';         

var config = require('./config/config'); // file chain - config.js -> development.js
var mongoose = require('./config/mongoose'); // file chain - mongoose -> config.js -> development.js AND mongoose -> dbMEANF.server.model.js
var app = require('./config/express.js'); // file chain - express.js -> config.js -> development.js AND express.js -> publicMEANFroutes.js -> dbMEANF.server.controller.js

var express  = require('express');                                            
var db = mongoose();                                                            
 
app.use(express.static(__dirname));
app.listen(config.port);                                                        
                                                                                
module.exports = app;                                                           
console.log(process.env.NODE_ENV + " server listening on port " + config.port + " -> Enter the following in your browser: ------------------------------------> http://127.0.0.1:" + config.port + "/publicMEANFindex_Exp0.html");
