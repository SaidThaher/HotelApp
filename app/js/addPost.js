(function (angular) {
'use strict';
 
var app = angular.module('myApp.addPost', [])
 
app.controller('AddPostCtrl', ['$scope','$rootScope','CommonProp','$location','Upload','$timeout', function($scope,$rootScope,CommonProp,$location,Upload,$timeout) {
	
	if(!CommonProp.getUser()){
    $location.path('/main');
	}


	/***** Add data to firebase *****/
	$scope.AddPost = function(files) {
			var url = "https://hotelboard.firebaseio.com/";
			var fb = new Firebase(url);

			var fbAuth = fb.getAuth();
			var category = $scope.Category;

			var newFb = fb.child("users/" + fbAuth.uid + "/" + category)
			//if NO Files been selected	
			if (files == undefined){

			newFb.push({
						title:     $scope.article.title,
						post:      $scope.article.post,
						emailId:   CommonProp.getUser(),
						images :   null
						
						
					},function(error) {
						if (error) {
							console.log("Error:",error);
						} else {
						console.log("Post set successfully!");
						$location.path('/home');
						console.log(category);
						$scope.$apply();
					}	
				});

			} else {
				//if Files selcted
			Upload.base64DataUrl(files).then(function(base64Urls){

				newFb.push({
					title:     $scope.article.title,
					post:      $scope.article.post,
					emailId:   CommonProp.getUser(),
					images : base64Urls
					
					
				},function(error) {
					if (error) {
						console.log("Error:",error);
					} else {
					console.log("Post set successfully!");
					$location.path('/home');
					$scope.$apply();
				
					}
					
				});

			});
		}
}
	$scope.remove = function(array, index){
    array.splice(index, 1);


}
 
}]);
})(angular);