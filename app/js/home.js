(function (angular) {
'use strict';
 
var app = angular.module('myApp.home', [])
 
 
app.controller('HomeCtrl', ['$scope','$rootScope','CommonProp','$firebaseArray','$firebaseObject','$location', function($scope,$rootScope,CommonProp,$firebaseArray,$firebaseObject,$location) {
 	$scope.username = CommonProp.getUser();

 	if(!$scope.username){
    $location.path('/main');
	}

 	var url = "https://hotelboard.firebaseio.com/";
 	var fb = new Firebase(url);
 	
 	

 	$scope.articles = $firebaseArray(fb);
 	
 	
 	//Show the edit modal and grap the data from the selected post
 	$scope.editPost = function(id,key) {
 		var fbE = new Firebase(url + id + '/' + key);
 		
 		$scope.postToUpdate = $firebaseObject(fbE);
 		$('#editModal').modal();
 		console.log($firebaseObject(fbE));
 	}
 	//Update procces 
 	$scope.update = function() {
 		
 		var fbU = $scope.postToUpdate.$ref();
 		console.log($firebaseObject(fbU));
 		if($scope.postToUpdate.images == undefined){
 			$scope.postToUpdate.images = null;
 		}
 	
 		fbU.update({
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
 	//show the confirm delete modal with warning message
 	$scope.confirmDelete = function(id,key) {
 		var fbC = new Firebase(url + id +'/' + key);
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