var scotchTodo = angular.module('BareBones', [])

.controller('mainController', ['$scope','$http', function($scope, $http) {
	
        var bareSelf = this;
        // callback function
        var receiveData = function(data){
            bareSelf.bareData = data;
        };
        bareSelf.testVar = "This is a test to assure data elements are displayed above";
	$http.get('/api/todos')
		.success(function(data) {
			receiveData(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

}]);