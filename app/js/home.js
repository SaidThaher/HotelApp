(function (angular) {
'use strict';
 
var app = angular.module('myApp.home', [])
 
 
app.controller('HomeCtrl', ['$scope','CommonProp','$firebaseArray','$firebaseObject','$location', function($scope,CommonProp,$firebaseArray,$firebaseObject,$location) {
 	$scope.username = CommonProp.getUser();

 	if(!$scope.username){
    $location.path('/main');
	}

 	var url    = "https://hotelboard.firebaseio.com/";
 	var fb     = new Firebase(url);
 	var fbAuth = fb.getAuth();
 	
 	var fbObj  = fb.child("users/").orderByKey().equalTo(fbAuth.uid);

 	//View the data
 	$scope.categories = $firebaseArray(fbObj);
 	
 	console.log($scope.categories);
 	
 	
 	//Show the edit modal and grap the data from the selected post using user id , category, and kay  
 	$scope.editPost = function(id,link,cat,key) {
 		var fbE = new Firebase(url + 'users/' + id + '/' + link + '/' + cat + '/' + key);
 		
 		$scope.postToUpdate = $firebaseObject(fbE);
 		$('#editModal').modal();
 		
 	}
 	//Update procces 
 	$scope.update = function() {
 		
 		var fbU = $scope.postToUpdate.$ref();
 		//If user deleted the image while update 
 		if($scope.postToUpdate.images == undefined){
 			$scope.postToUpdate.images = null;
 		}
 	
 		fbU.update({
 			title:     $scope.postToUpdate.title,
 			post:      $scope.postToUpdate.post,
 			emailId:   $scope.postToUpdate.emailId,
 			images:    $scope.postToUpdate.images
 		}, function(error) {
 			if (error) {
 				console.log('Error:', error);
 			} else {
 				$('#editModal').modal('hide');
 			}
 		});
 	}

 	//show the confirm delete modal with warning message for deleting the post using user id , category, and kay 
 	$scope.confirmDelete = function(id,link,cat,key) {
 		var fbC = new Firebase(url + 'users/' + id + '/' + link + '/' + cat + '/' + key);
 		$scope.postToDelete = $firebaseObject(fbC);
 		$('#deleteModal').modal();
 		
 	}

 	//delete procces
	$scope.deletePost = function() {
 		
 		var fbD = $scope.postToDelete.$ref();
 		fbD.remove(function(error) {
 			if (error) {
 				console.log('Error:', error);
 			} else {
 				$('#deleteModal').modal('hide');
 			}
 		
 		});
 	}

 	$scope.remove = function(array, index){
    array.splice(index, 1);
}

}]);
})(angular);