(function (angular) {
'use strict';
 
var app = angular.module('myApp.addImages', []);
 
app.controller('AddImagesCtrl', ['$scope','CommonProp','$location','Upload','$timeout', function($scope,CommonProp,$location,Upload,$timeout) {

	if(!CommonProp.getUser()){
	    $location.path('/main');
	}


	/***** Add Images to firebase *****/
	$scope.AddImages = function(files) {
			var url = "https://hotelboard.firebaseio.com/";
			var fb = new Firebase(url);
			var fbAuth = fb.getAuth();
			var newFb = fb.child("users/" + fbAuth.uid).child("pictures");

			Upload.base64DataUrl(files).then(function(base64Urls){

				newFb.push({	
					images : base64Urls
				},function(error) {
					if (error) {
						console.log("Error:",error);
					} else {
					swal("Success!", "Added successfully!", "success");
					$location.path('/home');
					$scope.$apply();
				
					}
					
				});

			});
		
}


	$scope.remove = function(array, index){
    array.splice(index, 1);


}

	}]);
})(angular);