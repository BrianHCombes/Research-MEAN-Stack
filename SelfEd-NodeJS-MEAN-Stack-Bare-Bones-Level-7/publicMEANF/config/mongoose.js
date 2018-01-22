var config = require('./config');
var mongoose = require('mongoose'); // This line is needed even though it's also declared in < dbMEANF.server.model.js >
    
require('../app/models/dbMEANF.server.model');  // See file dbMEANF.server.model.js 
                                                // Moved this outside the function and the < MissingSchemaError > went away. 
                                                // See ReadME.txt and search for date 05/14/2017, and 05/15/2017.

module.exports = function() {
    var db = mongoose.connect(config.db, {useMongoClient: true});
    // require('../app/models/dbMEANF.server.model');  // See file dbMEANF.server.model.js
    return db;
};
// called by publicMEANFserver.js 
// 
// However, the config variable is defined by the contents of the config.js
// file
//