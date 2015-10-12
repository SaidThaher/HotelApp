(function (angular) {
'use strict';
 //Navigation controller 
var app = angular.module('myApp.navigat', [])

  app.controller('NavbarCtrl', ['$scope','$location','CommonProp', function($scope, $location,CommonProp) {

   $scope.isRouteActive = function(route) { 
        var curRoute = $location.path();
        return curRoute.match(route);
    }
    $scope.logout = function() {
		CommonProp.logoutUser();
	}

}]);
  })(angular);