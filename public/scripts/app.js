var app = angular.module('mainApp', ['ngRoute']);


app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  	.when('/', {
          templateUrl	:	'html/landing.html',
          controller	:	'landingCtrl'
  	})
    .when('/trajectory', {
          templateUrl	:	'html/trajectory.html',
          controller	:	'trajectoryCtrl'
  	})
    .when('/dashboard', {
          templateUrl	:	'html/dashboard.html',
          controller	:	'dashboardCtrl'
  	})
    .when('/about', {
          templateUrl	:	'html/about.html',
          controller	:	'aboutCtrl'
  	})
    .otherwise({ redirectTo: '/' });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});


app.controller('homeCtrl', function ($scope,$http,$location) {
});
