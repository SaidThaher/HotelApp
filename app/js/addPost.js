'use strict';
 
angular.module('myApp.addPost', ['ngRoute'])
 
.controller('AddPostCtrl', ['$scope','CommonProp','$firebase','$location','Upload','$timeout', function($scope,CommonProp,$firebase,$location,Upload,$timeout) {
	if(!CommonProp.getUser()){
    $location.path('/main');
	}

	$scope.upload = function(files){

			$scope.files = files;
		        if (files && files.length > 0) {
		        for (var i = 0; i < files.length; i++) {
		        	var file = files[i];
            	console.log(file);
         		file.upload = Upload.dataUrl(file, disallowObjectUrl).then(function(url){
        		//console.log(url);
        	});

         		file.upload.then(function (response) {
      				$timeout(function () {
       				 file.result = response.data;
   				   });
   				 }, function (response) {
     				 if (response.status > 0)
      				  console.log(response.status + ': ' + response.data);
    				});
         	}
    	}

	}

	//Add data to firebase
	$scope.AddPost = function(files) {
			var fb = new Firebase("https://hotelboard.firebaseio.com/Articles/");
			/*
			$scope.files = files;
		        if (files && files.length > 0) {
		        for (var i = 0; i < files.length; i++) {
		        	var file = files[i];
            	console.log(file);
         		file.upload = Upload.dataUrl(file, disallowObjectUrl).then(function(url){
        		//console.log(url);
        	});

         		file.upload.then(function (response) {
      				$timeout(function () {
       				 file.result = response.data;
   				   });
   				 }, function (response) {
     				 if (response.status > 0)
      				  console.log(response.status + ': ' + response.data);
    				});
         	}
    	}*/


		

			var title = $scope.article.title;
			var post  = $scope.article.post;
			var user  = CommonProp.getUser();
			var images = $scope.upload(files);
			fb.push({
				title:     title,
				post:      post,
				emailId:   user,
				images : images,
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

	}
 
}]);