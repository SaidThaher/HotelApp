(function (angular) {
'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'firebase',
  'angularModalService',
  'myApp.main',
  'myApp.register',
  'myApp.home',
  'myApp.addPost',
  'myApp.navigat',
  'ngFileUpload'

  
])

app.config(['$routeProvider', function($routeProvider) {
 	$routeProvider
  .when('/main', {
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
    })

  .when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
    })

  .when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
    })

  .when('/addPost', {
        templateUrl: 'templates/addPost.html',
        controller: 'AddPostCtrl'
    })
	.otherwise({
        redirectTo: '/main'
    })

}]);
})(angular);
