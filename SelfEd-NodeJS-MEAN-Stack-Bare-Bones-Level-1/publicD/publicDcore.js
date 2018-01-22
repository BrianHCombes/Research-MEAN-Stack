var scotchTodo = angular.module('BareBones', [])

.controller('mainController', ['$scope','$http', function($scope, $http) {
	
        var bareSelf = this;
        // callback function
        var receiveData = function(data){
            bareSelf.bareData = data;
        };
        
	$http.get('/api/publicD/Value/{"objPropertyName":"This is the Obj Property Value Passed"}')
		.success(function(data) {
			receiveData(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

}]);