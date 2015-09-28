'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'angularModalService',
  'myApp.main',
  'myApp.register',
  'myApp.home',
  'myApp.addPost',
  'myApp.navigat',
  'ngFileUpload'
  
])
.config(['$routeProvider', function($routeProvider) {
 	$routeProvider
 	.when('/addPost', {
        templateUrl: 'templates/addPost.html',
        controller: 'AddPostCtrl'
    })
	.otherwise({
        redirectTo: '/main'
    })

}]);

