angular.module('BareBones', ['ngSanitize'])

.controller('mainController', ['MongoData', 'Lang', function(MongoData, Lang) {
	
        var bareSelf = this;
        // callback function
        
        var receiveLang = function(langs){
                bareSelf.languages = langs;
        };

        Lang.getLang(receiveLang);

        var receiveData = function(data){
                bareSelf.bareData = data;
                //bareSelf.dataR = data;
            };
        
        var receiveTest = function(msg){
                alert("The query to send by Post is: " + msg);
        };
        
        // initialize radio butons 
        bareSelf.getDocRadioBtn = "field1";
        bareSelf.radioBtn = "field1";
        bareSelf.viaBtn1 =   "viaReqBody";
        bareSelf.viaBtn2 =   "viaReqQuery";
        bareSelf.viaBtn3 =   "viaPost";
        
//************* GET ***********************************************************                
        bareSelf.getAllData = function(){
            //console.log("Made it to the getData function");
            bareSelf.checkGet = true;
            MongoData.mongoGetAll(receiveData);
        };

        bareSelf.getDoc = function(){
            
            var queryData = {'msgA':'', 'msgB':''};
            
            queryData.msgA = bareSelf.queryString;
            queryData.msgB = bareSelf.queryString;
            
            bareSelf.showViaBtn = "1st show: " + bareSelf.viaBtn1; // show only
             // display
            if(bareSelf.viaBtn1 === "viaUrlParam"){
                bareSelf.testmsg = "via URL Param";
                bareSelf.dataQD = queryData;
                bareSelf.showViaBtn = "2nd show: " + bareSelf.viaBtn1;
                MongoData.mongoGetDocViaUrlParam(receiveData, queryData, bareSelf);
            }
            else if(bareSelf.viaBtn1 === "viaReqQuery"){
                bareSelf.dataQD = queryData;
                bareSelf.showViaBtn = "2nd show is: " + bareSelf.viaBtn1; // show only
                queryData = 'queryData[msgA]=' + queryData.msgA + '&queryData[msgB]=' + queryData.msgB;
                MongoData.mongoGetDocViaReqQueryObj(receiveData, queryData, bareSelf);
            }
            else {
               
                if(bareSelf.getDocRadioBtn === "field1"){
                    var queryDataA = {'msgA':''};
                    queryDataA.msgA = queryData.msgA;
                    queryData = queryDataA;
                }   
                if(bareSelf.getDocRadioBtn === "field2"){
                    var queryDataB = {'msgB':''};
                    queryDataB.msgB = queryData.msgB;
                    queryData = queryDataB;
                }
                // alert(queryData);
                MongoData.mongoGetDocViaReqBodyObj(receiveData, queryData, bareSelf); 
            }
        };
//************* END GET *******************************************************                             
        
// ******************* POST ***************************************************        
        bareSelf.field1 = "DefaultPostData";
        bareSelf.field2 = "DefaultPostData";
        bareSelf.postData = function(){
            // console.log("function called");
            bareSelf.checkPost = true;
            var documentObj =  {"msgA":"A","msgB":"B"};
            documentObj.msgA = bareSelf.field1;
            documentObj.msgB = bareSelf.field2;
            if(bareSelf.viaBtn2 === "viaUrlParam"){
                MongoData.mongoPostViaUrlParam(receiveData, documentObj);
            } else {
                MongoData.mongoPostViaConfigObj(receiveData, documentObj);
            }
        };
// ******************* END POST *********************************************        
        
// ******************* DELETE *************************************************  
        bareSelf.dataToDelete = "DefaultPostData";
        bareSelf.deleteData = function(){    
            bareSelf.checkDelete = true;
            var dataToDelete1 = {'msgA':''};
            var dataToDelete2 = {'msgB':''};
            var dataToDelete = {};
            var dataToDeleteUrl = {};
            var dataToDeleteReq = {};
            var dataToDeletePost = {};
            
            
            if(bareSelf.radioBtn === "field1"){
                bareSelf.msg = bareSelf.radioBtn; // Display
                dataToDelete1.msgA = bareSelf.dataToDelete; 
                dataToDeleteUrl = dataToDelete1;
                dataToDeleteReq = 'queryData[msgA]=' + dataToDelete1.msgA;
                //dataToDeleteReq = dataToDelete1;
                //var test = JSON.stringify(dataToDeleteReq);
                //alert("Data is: " + test);
                dataToDeletePost = dataToDelete1;
            }
            else if(bareSelf.radioBtn === "field2"){
                bareSelf.msg = bareSelf.radioBtn;
                dataToDelete2.msgB = bareSelf.dataToDelete; 
                dataToDeleteUrl = dataToDelete2;
                dataToDeleteReq = 'queryData[msgB]=' + dataToDelete2.msgB;
                // dataToDeleteReq = dataToDelete2;
                dataToDeletePost = dataToDelete2;
            }
           
            
            
            bareSelf.dataD1 = JSON.stringify(dataToDelete);
         
            // alert("Btn3 is: " + bareSelf.viaBtn3);
            if(bareSelf.viaBtn3 === "viaUrlParam"){
                MongoData.mongoDeleteViaUrlParam(receiveData, dataToDeleteUrl, bareSelf);
            } 
            else if(bareSelf.viaBtn3 === "viaReqQuery"){
                //dataToDelete = 'queryData[msgA]=' + dataToDelete.msgA + '&queryData[msgB]=' + dataToDelete.msgB;
                MongoData.mongoDeleteViaReqQueryObj(receiveData, dataToDeleteReq, bareSelf);
            }
            else {
                // alert("Met the conditional and Btn3 is: " + bareSelf.viaBtn3);
                //dataToDelete = 'queryData[msgA]=' + dataToDelete.msgA + '&queryData[msgB]=' + dataToDelete.msgB;
                //MongoData.mongoDeleteViaPost(receiveData, dataToDeletePost, bareSelf);
                MongoData.mongoDeleteViaPost(receiveData, dataToDeletePost, bareSelf);
                // alert("After the function call: " + bareSelf.viaBtn3);
            }
        }; 
}])   
// ******************* END DELETE *********************************************        
 
.factory('Lang', ['$http', function($http){
        
    return  {
        
            getLangB:    function(receiveLang){
                                $http.get('/api/todos/get/all')
                                    .success(function(data) {
                                            receiveData(data);
                                    })
                                    .error(function(data) {
                                            console.log('Error: ' + data);
                                    });
                            },
        
            getLang:    function(receiveLang){
                        var languages =    [
                                    {   "lang1":"HTML5","yes1":"&#10004;","no1":"",
                                        "lang2":"CSS3","yes2":"&#10004;","no2":"",
                                        "lang3":"Javascript", "yes3":"&#10004;","no3":"",
                                        "lang4":"Bootstrap", "yes4":"&#10004;","no4":""},
                                    
                                    {   "lang1":"jQuery", "yes1":"","no1":"&#10004;",
                                        "lang2":"AngularJS", "yes2":"&#10004;","no2":"",
                                        "lang3":"Express", "yes3":"&#10004;","no3":"",
                                        "lang4":"NodeJS", "yes4":"&#10004;","no4":""},
                                    
                                    {   "lang1":"MongDB", "yes1":"&#10004;","no1":"",
                                        "lang2":"JSON", "yes2":"&#10004;","no2":"",
                                        "lang3":"Mongoose", "yes3":"&#10004;","no3":"",
                                        "lang4":"Bitnami", "yes4":"&#10004;","no4":""},
                                    
                                    {   "lang1":"Linux", "yes1":"&#10004;","no1":"",
                                        "lang2":"Bash", "yes2":"&#10004;","no2":"",
                                        "lang3":"puTTy", "yes3":"&#10004;","no3":"",
                                        "lang4":"SSH", "yes4":"&#10004;","no4":""},
                                    
                                    {   "lang1":"Ubuntu", "yes1":"&#10004;","no1":"",
                                        "lang2":"Cloud Server Deployment", "yes2":"&#10004;","no2":"",
                                        "lang3":"PHP", "yes3":"","no3":"&#10004;",
                                        "lang4":"MySQL", "yes4":"","no4":"&#10004;"},
                                    
                                    {   "lang1":"AJAX", "yes1":"","no1":"&#10004;",
                                        "lang2":"Java", "yes2":"","no2":"&#10004;",
                                        "lang3":"JavaFX", "yes3":"","no3":"&#10004;",
                                        "lang4":"Photoshop", "yes4":"","no4":"&#10004;"},
                                    
                                    {   "lang1":"Illustrator", "yes1":"","no1":"&#10004;",
                                        "lang2":"Premiere", "yes2":"","no2":"&#10004;",
                                        "lang3":"nano", "yes3":"&#10004;","no3":"",
                                        "lang4":"MySQLi", "yes4":"","no4":"&#10004;"}
                                ];
                        receiveLang(languages);
                        }
    };
}])
 
 
 
 
 
.factory('MongoData', ['$http', function($http){
        // var pathArg = '/api/publicMEANE/' + '{"msg12":{"msgA":"This msgA property value from Data Element 11 from folder publicMEANE", "msgB":"This msgB property value from Data Element 11 from folder publicMEANE"}}';
	
    return  {

            mongoGetAll:    function(receiveData){
                                $http.get('/api/todos/get/all')
                                    .success(function(data) {
                                            receiveData(data);
                                    })
                                    .error(function(data) {
                                            console.log('Error: ' + data);
                                    });
                            },

            mongoGetDocViaUrlParam:
                            function(receiveData, queryData, bareSelf){
                                queryData = JSON.stringify(queryData);
                                bareSelf.queryS = queryData;
                                $http.get('api/todos/getDoc/url/' + queryData)
                                    .success(function(data) {
                                                receiveData(data);
                                                console.log(data);
                                        })
                                    .error(function(data) {
                                            console.log('Error: ' + data);
                                    });
            },
            
            mongoGetDocViaReqQueryObj:
                            function(receiveData, queryData, bareSelf){
                                //queryData = JSON.stringify(queryData);
                                // queryData = 'q=tobi+ferret';
                                //queryData = 'order=desc&shoe[color]=blue&shoe[type]=converse';

                                bareSelf.queryS = queryData; // display
                                bareSelf.testmsg1 = "via Req Query"; // display
                                
                                $http.get('api/todos/getDoc/req/?' + queryData)
                                    .success(function(data) {
                                                receiveData(data);
                                                console.log(data);
                                        })
                                    .error(function(data) {
                                            console.log('Error: ' + data);
                                    });
            },
            
            mongoGetDocViaReqBodyObj:
                            function(receiveData, queryData, bareSelf){
                                //queryData = JSON.stringify(queryData);
                                // queryData = 'q=tobi+ferret';
                                //queryData = 'order=desc&shoe[color]=blue&shoe[type]=converse';

                                bareSelf.queryData = queryData; // display
                                //bareSelf.testmsg1 = "via Req Query"; // display
                                // var routeAndData = "api/todos/getDoc/req/?" + queryData;
                                // var qData = {"msgA":"DefaultPost#Data"};
                                $http({ method:"POST",
                                        url:"api/todos/getDoc/reqBody",
                                        data: queryData
                                        
                                     })   
                                    .success(function(data) {
                                                receiveData(data);
                                                console.log(data);
                                        })
                                    .error(function(data) {
                                            console.log('Error: ' + data);
                                    });
            },

            // Passing as a config object
            mongoPostViaConfigObj:
                            function(receiveData, dataToPost){
                                // console.log("client POST function reached");
                                var routeAndData = '/api/todos/configobj';
                                //$http.post('/api/todos' , dataToPost) // This is the shortcut method - not sure I like the shortcut yet.
                                $http({ method:"POST", 
                                        url:"/api/todos/configobj", 
                                        data:dataToPost 
                                    })
                                    .success(function(data) {
                                            receiveData(data);
                                    })
                                    .error(function(data) {
                                            console.log('Error: ' + routeAndData);
                                    });
                            },

            // Passing as a url parameter
            mongoPostViaUrlParam:      
                            function(receiveData, dataToPost){
                                console.log("client POST function reached");
                                dataToPost = JSON.stringify(dataToPost);
                                var routeAndData = '/api/todos/urlparam/' + dataToPost;
                                //$http.post('/api/todos' , dataToPost) // This is the shortcut method - not sure I like the shortcut yet.
                                $http({ method:"POST", 
                                        url:routeAndData 
                                    })
                                    .success(function(data) {
                                            receiveData(data);
                                    })
                                    .error(function(data) {
                                            console.log('Error: ' + routeAndData);
                                    });
                            },
            
            // Passing delete query as a url parameter
            mongoDeleteViaUrlParam:    
                            function(receiveData, dataToDelete, bareSelf){
                                dataToDelete = JSON.stringify(dataToDelete);
                                var routeParam = "/api/todos/del/urlparam/" + dataToDelete;
                                bareSelf.dataD2 = "Url with param: " + routeParam;
                                $http({method:"DELETE", url:routeParam})
                                    .success(function(data) {
                                            receiveData(data);
                                    })
                                    .error(function(data) {
                                            console.log('Error:');
                                    });
                            },
                            
            // Passing delete query as a config object - DOES NOT WORK
            // The API does not support this and thus does NOT work. I tried.
            // See examples at http://expressjs.com/en/api.html#req.query
            mongoDeleteViaReqQueryObj:    
                            function(receiveData, dataToDelete, bareSelf){
                                //console.log(JSON.stringify(dataToDelete));
                                bareSelf.dataD2 = "via config object: " + JSON.stringify(dataToDelete); // display
                                var routeAndQuery = "/api/todos/delDoc/req/?" + dataToDelete;
                                $http({ method:"DELETE", 
                                        url:routeAndQuery
                                })
                                    .success(function(data) {
                                            receiveData(data);
                                    })
                                    .error(function(data) {
                                            console.log('Error:');
                                    });
                            },
                            
            mongoDeleteViaPost:    
                            function(receiveData, dataToDelete, bareSelf){
                                // alert(" Made it to the Delete via Post service");
                                bareSelf.dataD2 = "Made it to the Delete By Post Function Service";
                                var routeAndDelByPost = "/api/todos/delDoc/viaPost";
                                
                                // receiveTest(dataToDelete);
                                
                                
                                $http({ method:"POST", 
                                        url:routeAndDelByPost, 
                                        data:dataToDelete 
                                    })
                                    .success(function(data) {
                                            // receiveData(data);
                                            receiveData(data);
                                    })
                                    .error(function(data) {
                                            console.log('Error with: ' + routeAndDelByPost);
                                    });
                            
                            }         
        };
}]); 