angular.module('BareBones', [])

.controller('mainController', ['MongoData', function(MongoData) {
	
        var bareSelf = this;
        // callback function
        var receiveData = function(data){
                bareSelf.bareData = data;
                //bareSelf.dataR = data;
            };
        
        bareSelf.getDocRadioBtn = "field1"
        bareSelf.radioBtn = "radio1";
        bareSelf.viaBtn1 =   "viaReqQuery";
        bareSelf.viaBtn2 =   "viaReqQuery";
        bareSelf.viaBtn3 =   "viaReqQuery";
        
//************* GET ***********************************************************                
        bareSelf.getAllData = function(){
            //console.log("Made it to the getData function");
            bareSelf.checkGet = true;
            MongoData.mongoGetAll(receiveData);
        };

        bareSelf.getDoc = function(){
            
            var docQuery = bareSelf.queryInfo;
            
            var queryData = {'msgA':'', 'msgB':''};
            
            queryData.msgA = bareSelf.queryInfo;
            queryData.msgB = bareSelf.queryInfo;
            
            bareSelf.dataQD = queryData; // display
            if(bareSelf.viaBtn1 === "viaUrlParam"){
                bareSelf.testmsg = "via URL Param";
                MongoData.mongoGetDocViaUrlParam(receiveData, queryData, bareSelf);
                
            }
            else {
                // order=desc&shoe[color]=blue&shoe[type]=converse
                queryData = 'queryData[msgA]=' + queryData.msgA + '&queryData[msgB]=' + queryData.msgB;
                MongoData.mongoGetDocViaReqQueryObj(receiveData, queryData, bareSelf);
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
        bareSelf.deleteData = function(){    
            bareSelf.checkDelete = true;
            var dataToDelete1 = {'msgA':''};
            var dataToDelete2 = {'msgB':''};
            var dataToDelete = {};
            
            if(bareSelf.radioBtn === "field1"){
                bareSelf.msg = bareSelf.radioBtn; // Display
                dataToDelete1.msgA = bareSelf.dataToDelete; 
                dataToDeleteUrl = dataToDelete1;
                dataToDeleteReq = 'queryData[msgA]=' + dataToDelete1.msgA;
            }
            else if(bareSelf.radioBtn === "field2"){
                bareSelf.msg = bareSelf.radioBtn;
                dataToDelete2.msgB = bareSelf.dataToDelete; 
                dataToDeleteUrl = dataToDelete2;
                dataToDeleteReq = 'queryData[msgB]=' + dataToDelete2.msgB;
            }
            
            bareSelf.dataD1 = JSON.stringify(dataToDelete);
         
            if(bareSelf.viaBtn3 === "viaUrlParam"){
                MongoData.mongoDeleteViaUrlParam(receiveData, dataToDeleteUrl, bareSelf);
            } else {
                //dataToDelete = 'queryData[msgA]=' + dataToDelete.msgA + '&queryData[msgB]=' + dataToDelete.msgB;
                MongoData.mongoDeleteViaReqQueryObj(receiveData, dataToDeleteReq, bareSelf);
            }
        }; 
}])   
// ******************* END DELETE *********************************************        
 
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




            // Passing as a config object
            mongoPostViaConfigObj:
                            function(receiveData, dataToPost){
                                console.log("client POST function reached");
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
            mongoDeleteViaReqQueryObj:    
                            function(receiveData, dataToDelete, bareSelf){
                                //console.log(JSON.stringify(dataToDelete));
                                bareSelf.dataD2 = "via config object: " + JSON.stringify(dataToDelete); // display
                                $http({ method:"DELETE", 
                                        url:"/api/todos/delDoc/req/?" + dataToDelete
                                        
                                })
                                    .success(function(data) {
                                            receiveData(data);
                                    })
                                    .error(function(data) {
                                            console.log('Error:');
                                    });
                            }
        };
}]); 


/* 
  //params:dataToPost, 
                                        //headers:dataToPost, 
                                        //eventHandlers:dataToPost,
                                        //uploadEventHandlers:dataToPost,
                                        //xsrfHeaderName:"String1",
                                        //xsrfCookieName:"String2",
                                        //transformRequest:"String3", 
                                        //transformResponse:"String4",
                                        //paramSerializer:"String5", 
                                        //cache:false,
                                        //timeout:2000,
                                        //withCredentials:true,
                                        //responseType:"json" 
*/
