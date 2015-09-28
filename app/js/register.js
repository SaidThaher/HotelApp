'use strict';
 
angular.module('myApp.register', [
	'ngRoute', 
	'firebase'
])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
    });
}])
 
// Register controller
.controller('RegisterCtrl', ['$scope','$location', '$firebaseAuth', function($scope,$location, $firebaseAuth) {
	var fb = new Firebase("https://hotelboard.firebaseio.com/");
	var authObj = $firebaseAuth(fb);

	$scope.signUp = function() {
		if (!$scope.regForm.$invalid) {
			var email    = $scope.user.email;
			var password = $scope.user.password;

			if (email && password) {
				authObj.$createUser({email, password})
					.then(function() {
						console.log('User creation success');
						$location.path('/main');
					}, function(error) {
						console.log(error);
						$scope.regError        = true;
						$scope.regErrorMessage = error.message;
					});
			}
		}
	};
 
}]);