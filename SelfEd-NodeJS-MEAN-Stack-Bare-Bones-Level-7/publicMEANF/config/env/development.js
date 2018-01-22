var port = 1337;

module.exports = {
    port: port,
    db: 'mongodb://localhost/meanb2'
    //db: 'mongodb://BrianHCombes:aisleDrone811@ttdliveaisle-shard-00-00-fb3te.mongodb.net:27017,ttdliveaisle-shard-00-01-fb3te.mongodb.net:27017,ttdliveaisle-shard-00-02-fb3te.mongodb.net:27017/meanc1?ssl=true&replicaSet=TTDLiveaisle-shard-0&authSource=admin'
    // mongodb://BrianHCombes:<PASSWORD>@ttdliveaisle-shard-00-00-fb3te.mongodb.net:27017,ttdliveaisle-shard-00-01-fb3te.mongodb.net:27017,ttdliveaisle-shard-00-02-fb3te.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=TTDLiveaisle-shard-0&authSource=admin
};

/* 
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://kay:myRealPassword@mycluster0-shard-00-00-wpeiv.mongodb.net:27017,mycluster0-shard-00-01-wpeiv.mongodb.net:27017,mycluster0-shard-00-02-wpeiv.mongodb.net:27017/admin?ssl=true&replicaSet=Mycluster0-shard-0&authSource=admin";
MongoClient.connect(uri, function(err, db) {
  db.close();
});
*/





// Called by the config.js file after first being assigned to the global
// variable process.env.NODE_ENV in the publicMEANFserver.js file (first line).
// See publicMEANFserver.js file for more discussion.
// 
// The following is excerpted from:
// < https://hackhands.com/mongodb-crud-mvc-way-with-passport-authentication/ >
// 
// "The proper way to store application variables is to use your environment 
//  configuration file. In the config folder create an env folder and inside 
//  it create a development.js file with the following code: 
//              var port = 1337;
//              module.exports = {
//                  port: port,
//                  db: 'mongodb://localhost/dbMEANF'
//              };"
//      