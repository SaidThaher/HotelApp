(function (angular) {
'use strict';
 
var app = angular.module('myApp.main', [])
 
// Main controller
app.controller('MainCtrl', ['$scope','$location','CommonProp','$firebaseAuth', function($scope,$location,CommonProp,$firebaseAuth) {
	var fb = new Firebase("https://hotelboard.firebaseio.com/");
	var loginObj = $firebaseAuth(fb);
	
	
	$scope.SignIn = function(e) {
		e.preventDefault();          //To prevent from refresh
		var username = $scope.user.email;
		var password = $scope.user.password;

		loginObj.$authWithPassword({
			email: username,
			password: password
		})
		.then(function(user) {
			console.log('Authentication successful');
			CommonProp.setUser(user.password.email);
			$location.path('/home');

		}, function(error) {
			console.log('Authentication failure');
		});
	}
	
}])

//CommonProp serive to share user info from another controller
app.service('CommonProp', ['$location','$firebaseAuth',function($location,$firebaseAuth) {
		var user = '';
		var fb = new Firebase("https://hotelboard.firebaseio.com/");
		var loginObj = $firebaseAuth(fb);

		return {
			getUser: function() {
				if(user == ''){
        			user = localStorage.getItem('userEmail');
    			}
				return user;
			},
			setUser: function(value) {
				localStorage.setItem("userEmail", value);
				user = value;
			},
			logoutUser:function() {
				loginObj.$unauth();
				user='';
    			localStorage.removeItem('userEmail');
				console.log('done logout!!!');
				$location.path('/main');
			}
		};
	}])
})(angular);