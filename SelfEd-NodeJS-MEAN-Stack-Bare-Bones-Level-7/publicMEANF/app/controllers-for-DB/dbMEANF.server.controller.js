// < meanbs > is the nameof the collection and is 
// defined in < dbMEANF.server.model.js >. < meanbs > is only 
// needed here, I'm pretty sure. No, it's also needed by the < mongoose.js >
// file but it's not obvious.
var msgMEANF = require('mongoose').model('meanbs');  

exports.listDocs = function(req, res, next) {
    showReqProperties(req, res, 'GET  all docs');  
    msgMEANF.find({}, function(err, msgdoc) {
        if (err) {
            return next(err);
        }
        else {
            res.json(msgdoc);
        }
    // }).sort({msgA:1});   // To sort alphabetically
    });
};

exports.getDocViaUrlParam = function(req, res, next) {
    //var docParam = JSON.parse(req.body);
    showReqProperties(req, res, 'GET doc via URL parameter'); 
    var docParam = req.params.docParam;
    //console.log('The document being searched for is.');
    //console.log(docParam);
    docParam = JSON.parse(docParam);
    //console.log('The document being searched for is.');
    //console.log(docParam.msgA);
    var query = {'msgA':""}
    query.msgA = docParam.msgA;
    console.log(query);
    
    msgMEANF.find(query, function(err, msgdoc) {
    //msgMEANF.find({}).sort({msgA:1}, function(err, msgdoc) {
        if (err) {
            return next(err);
        }
        else {
            //console.log("WTF!!!!! #2 This is listDocs but somehow will POST a document through Postman also");
            console.log("Below is from Mongoose");
            console.log(msgdoc);
            res.json(msgdoc);
        }
    });
};

exports.getDocViaReqQueryObj = function(req, res, next) {
    //var docParam = JSON.parse(req.body);
    //var docParam = req.params.docParam;
    showReqProperties(req, res, 'GET doc via req.query');
    
    // /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
    var docQuery = req.query;
    //console.log('The req.query value is:');
    //console.log(docQuery);
    //console.log(docQuery.queryData.msgA);
    //console.log(docQuery.queryData.msgB);
    
    
    
    //console.log('The document being searched for is.');
    //console.log(docParam);
    //docParam = JSON.parse(docParam);
    //console.log('The document being searched for is.');
    //console.log(docParam.msgA);
    var query = {'msgA':""};
    query.msgA = docQuery.queryData.msgA;
    //console.log(query);
 
    
    msgMEANF.find(query, function(err, msgdoc) {
    //msgMEANF.find({}).sort({msgA:1}, function(err, msgdoc) {
        if (err) {
            return next(err);
        }
        else {
            //console.log("WTF!!!!! #2 This is listDocs but somehow will POST a document through Postman also");
            console.log("Below is from Mongoose");
            console.log(msgdoc);
            res.json(msgdoc);
        }
    });
};


exports.getDocViaReqBodyObj = function(req, res, next) {
    //var docParam = JSON.parse(req.body);
    //var docParam = req.params.docParam;
    showReqProperties(req, res, 'Get doc via POST using req.body');
    
    // /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
    var docQuery = req.body;
    //console.log('The req.query value is:');
    //console.log(docQuery);
    //console.log(docQuery.queryData.msgA);
    //console.log(docQuery.queryData.msgB);
    
    
    
    //console.log('The document being searched for is.');
    //console.log(docParam);
    //docParam = JSON.parse(docParam);
    //console.log('The document being searched for is.');
    //console.log(docParam.msgA);
    // var query = {'msgA':""};
    
    
    // query.msgA = docQuery.queryData.msgA;
    //console.log(query);
 
    
    msgMEANF.find(docQuery, function(err, msgdoc) {
    //msgMEANF.find({}).sort({msgA:1}, function(err, msgdoc) {
        if (err) {
            return next(err);
        }
        else {
            //console.log("WTF!!!!! #2 This is listDocs but somehow will POST a document through Postman also");
            console.log("Below is from Mongoose");
            console.log(msgdoc);
            res.json(msgdoc);
        }
    });
};


exports.addDocByUrlParam = function(req, res, next) {
    
    showReqProperties(req, res, 'ADD doc via req.params');    

    var paramObj = req.params;
    var postP = paramObj.postParam;
    postP = JSON.parse(postP);

    var msgmeana = new msgMEANF(postP);
    //console.log("Message is: " + msgmeana.msgA);
    msgmeana.save(function(err) {       // saves document to the db
        if (err) {
            return next(err);
        }
        else {
            msgMEANF.find({}, function(err, msgdoc) { // lists all documents including the freshly saved document
                if (err) {
                    return next(err);
                }
                else {
                    postP = JSON.stringify(postP);
                    console.log("Document of " + postP + " successfully added!");
                    res.json(msgdoc);
                }
            });
        };
    });
};


exports.addDocByConfigObj = function(req, res, next) {
    
    showReqProperties(req, res, 'ADD doc via req.body');    
 
    var msgmeana = new msgMEANF(req.body);
    //console.log("Message is: " + msgmeana.msgA);
    msgmeana.save(function(err) {       // saves document to the db
        if (err) {
            return next(err);
        }
        else {
            msgMEANF.find({}, function(err, msgdoc) { // lists all documents including the freshly saved document
                if (err) {
                    return next(err);
                }
                else {
                    console.log("WTF!!!!! #2 from addDoc");
                    res.json(msgdoc);
                }
            });
        };
    });
};


exports.deleteDocByUrlParam = function(req, res, next) {
    
    showReqProperties(req, res, 'DELETE doc via req.param');    
    
    var paramObj = req.params;
    var docToDelete = JSON.parse(paramObj.deleteParam);

    var msgmeana = new msgMEANF(req.body);
    // console.log("The deleted doc is: " + docToDelete.msgA);
    console.log(docToDelete);
    msgMEANF.deleteOne(docToDelete, function(err) { // saves document to the db
        if (err) {
            return next(err);
        }
        else {
            msgMEANF.find({}, function(err, msgdoc) { // lists all documents including the freshly saved document
                if (err) {
                    return next(err);
                }
                else {
                    // console.log("WTF!!!!! #2 from deleteDoc1");
                    res.json(msgdoc);
                }
            });
        };
    });
};


// http://mongoosejs.com/docs/models.html  (for the remove method)
exports.deleteDocViaReqQueryObj = function(req, res, next) {
    
    showReqProperties(req, res, 'DELETE doc via req.query');
    
    //var delQuery = req.query.queryData;
    //console.log("Variable delQuery is:");
    //console.log(delQuery);
    
        msgMEANF.deleteOne(req.query.queryData, function(err) { // saves document to the db
            if (err) {
                return next(err);
            }
            else {
                msgMEANF.find({}, function(err, msgdoc) { // lists all documents including the freshly saved document
                    if (err) {
                        return next(err);
                    }
                    else {
                        console.log("WTF!!!!! from deleteDoc");
                        res.json(msgdoc);
                    }
                });
            };
        });
    //};    
};


// http://mongoosejs.com/docs/models.html  (for the remove method)
exports.deleteDocViaPost = function(req, res, next) {
    
    
    showReqProperties(req, res, 'delete doc via req.param using POST');
    console.log("made it to the DB controller");
    console.log(req.body);
    msgMEANF.deleteOne(req.body, function(err){
            if (err) {
                return next(err);
            }
            else {
            msgMEANF.find({}, function(err, msgdoc) { // lists all documents including the freshly saved document
                    if (err) {
                        return next(err);
                    }
                    else {
                        console.log("WTF!!!!! from deleteViaPost");
                        res.json(msgdoc);
                    }
                });    
            }
    });
    
    
    
};

function showReqProperties(req, res, method){
    console.log("****************************************************************************************************************");
    console.log("***************************************** " + method + " **********************************************");
    console.log("****************************************************************************************************************");
    
    console.log("-> req.app.settings.....Note: settings is one of many req.app properties.............");
    console.log(req.app.settings);
    console.log();
    
    console.log("-> req.cookies.................................................");
    console.log(req.cookies);
    console.log();
    
    console.log("-> req.fresh...................................................");
    console.log(req.fresh);
    console.log();
    
    console.log("-> req.hostname................................................");
    console.log(req.hostname);
    console.log();
    
    console.log("-> req.ip......................................................");
    console.log(req.ip);
    console.log();
    
    console.log("-> req.ips.....................................................");
    console.log(req.ips);
    console.log();
    
    console.log("-> req.path....................................................");
    console.log(req.path);
    console.log();
    
    console.log("-> req.protocol................................................");
    console.log(req.protocol);
    console.log();
    
    console.log("-> req.query...................................................");
    console.log(req.query);
    console.log();
    
    console.log("-> req.route...................................................");
    console.log(req.route);
    console.log();
    
    console.log("-> req.secure .................................................");
    console.log(req.secure);
    console.log();
    
    console.log("-> req.signedCookies...........................................");
    console.log(req.signedCookies);
    console.log();
    
    console.log("-> req.stale...................................................");
    console.log(req.stale);
    console.log();
    
    console.log("-> req.subdomains..............................................");
    console.log(req.subdomains);
    console.log();
    
    console.log("-> req.xhr.....................................................");
    console.log(req.xhr);
    console.log();
    
    
    
    console.log("-> req.method .................................................");
    console.log(req.method);
    console.log();
    
    console.log("-> req.baseUrl ................................................");
    console.log(req.baseUrl);
    console.log();
    
    console.log("-> req.originalUrl ............................................");
    console.log(req.originalUrl);
    console.log();

    console.log("-> req.url ....................................................");
    console.log(req.url);
    console.log();
    
    console.log("-> req.params .................................................");
    console.log(req.params);
    console.log();

    console.log("-> req.body ...................................................");
    console.log(req.body);
    console.log();

    console.log("-> req.headers ................................................");
    console.log(req.headers);
    console.log();
    
    console.log("-> res.app.settings.views......................................");
    console.log(res.app.settings.views);
    console.log();
    
};

