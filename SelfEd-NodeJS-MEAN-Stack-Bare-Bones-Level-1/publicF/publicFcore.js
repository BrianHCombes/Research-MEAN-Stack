angular.module('BareBones', [])

.controller('mainController', ['$scope','$http', function($scope, $http) {
	
        var bareSelf = this;
        // callback function
        var receiveData = function(data){
            bareSelf.bareData = data;
        };
        
        var pathArg = '/api/publicF/' + '{"msg14":{"msgA":"This msgA property value from Data Element 13 from folder publicF", "msgB":"This msgB property value from Data Element 13 from folder publicF"}}';
	$http.post(pathArg)
		.success(function(data) {
			receiveData(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

}]);