var scotchTodo = angular.module('BareBones', [])

.controller('mainController', ['$scope','$http', function($scope, $http) {
	
        var bareSelf = this;
        // callback function
        var receiveData = function(data){
            bareSelf.bareData = data;
        };
        
	$http.get('/api/publicC')
		.success(function(data) {
			receiveData(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

}]);