'use strict';
 
angular.module('myApp.home', [])
 
 
.controller('HomeCtrl', ['$scope','CommonProp','$firebaseArray','$firebaseObject','$location', function($scope,CommonProp,$firebaseArray,$firebaseObject,$location) {
 	$scope.username = CommonProp.getUser();

 	if(!$scope.username){
    $location.path('/main');
	}

 	var url = "https://hotelboard.firebaseio.com/Articles/";
 	var fb = new Firebase(url);
 	var fbObj = fb.startAt($scope.username).endAt($scope.username);	

 	
 	$scope.articles = $firebaseArray(fbObj);

 	$scope.editPost = function(id) {
 		var fb = new Firebase(url + id);
 		$scope.postToUpdate = $firebaseObject(fb);
 		$('#editModal').modal();
 	}

 	$scope.update = function() {
 		var fb = new Firebase(url + $scope.postToUpdate.$id);
 		if($scope.postToUpdate.images == undefined){
 			$scope.postToUpdate.images = null;
 		}
 	
 		fb.update({
 			title:   $scope.postToUpdate.title,
 			post:   $scope.postToUpdate.post,
 			emailId:   $scope.postToUpdate.emailId,
 			images: $scope.postToUpdate.images
 		}, function(error) {
 			if (error) {
 				console.log('Error:', error);
 			} else {
 				$('#editModal').modal('hide');


 			}
 		
 		});
 	}

 	$scope.confirmDelete = function(id) {
 		var fb = new Firebase(url + id);
 		$scope.postToDelete = $firebaseObject(fb);
 		$('#deleteModal').modal();
 		
 	}

	$scope.deletePost = function() {
 		var fb = new Firebase(url + $scope.postToDelete.$id);
 	
 		fb.remove(function(error) {
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