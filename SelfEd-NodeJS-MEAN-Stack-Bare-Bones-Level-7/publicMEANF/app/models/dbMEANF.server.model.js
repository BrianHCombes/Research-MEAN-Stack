var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MEANFSchema = new Schema({
    msgA: String,
    msgB: String
    
});

mongoose.model('meanbs', MEANFSchema); 

// called by < mongoose.js >
// < meanbs > is the name of the collection