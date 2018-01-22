angular.module('BareBones', [])

.controller('mainController', ['$scope','$http', function($scope, $http) {
	
        var bareSelf = this;
        // callback function
        var receiveData = function(data){
            bareSelf.bareData = data;
        };
        
        var pathArg = '/api/publicE/' + '{"msg9":{"msgA":"This msgA property value from Data Element 8 from folder publicE", "msgB":"This msgB property value from Data Element 8 from folder publicE"}}';
	$http.get(pathArg)
		.success(function(data) {
			receiveData(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

}]);