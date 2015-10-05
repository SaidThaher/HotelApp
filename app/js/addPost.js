'use strict';
 
angular.module('myApp.addPost', ['ngRoute'])
 
.controller('AddPostCtrl', ['$scope','CommonProp','$firebase','$location','Upload','$timeout', function($scope,CommonProp,$firebase,$location,Upload,$timeout) {
	if(!CommonProp.getUser()){
    $location.path('/main');
	}


	/***** Add data to firebase *****/
	$scope.AddPost = function(files) {
			var fb = new Firebase("https://hotelboard.firebaseio.com/Articles/");

			var title = $scope.article.title;
			var post  = $scope.article.post;
			var user  = CommonProp.getUser();
			var images = Upload.base64DataUrl(files).then(function(base64Urls){
			fb.push({
				title:     title,
				post:      post,
				emailId:   user,
				images : base64Urls,
				'.priority': user
				
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
	

	$scope.remove = function(array, index){
    array.splice(index, 1);
}
 
}]);