angular.module('BareBones', [])

.controller('mainController', ['$http', function($http) {
	
        var bareSelf = this;
        // callback function
        var receiveData = function(data){
            bareSelf.bareData = data;
        };
        
        var pathArg = '/api/publicG/' + '{"msg11":{"msgA":"This msgA property value from Data Element 10 from folder publicG", "msgB":"This msgB property value from Data Element 10 from folder publicG"}}';
	$http.delete(pathArg)
		.success(function(data) {
			receiveData(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

}]);