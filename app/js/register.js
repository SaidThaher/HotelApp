(function (angular) {
'use strict';
 
var app = angular.module('myApp.register', [])
 
 
// Register controller
app.controller('RegisterCtrl', ['$scope','$location', '$firebaseAuth', function($scope,$location, $firebaseAuth) {
	var fb = new Firebase("https://hotelboard.firebaseio.com/");
	var authObj = $firebaseAuth(fb);

	$scope.signUp = function() {
		if (!$scope.regForm.$invalid) {
			var email    = $scope.user.email;
			var password = $scope.user.password;

			if (email && password) {
				authObj.$createUser({email, password})
					.then(function(userData) {
						fb.child('users/' + userData.uid).set({
							HotelCode : email
						});
						
						swal("User Created Successfully");
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
  })(angular);