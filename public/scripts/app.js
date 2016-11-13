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
  $scope.sensorData = {
    'Requested Velocity' : 0,
    'Angle' : 90,
    'Battery' : 'NA',
    'Wall Seen' : false

  };
  $scope.trajectoryChangeFn = function(data) {
    console.log('parent');
  };

  // Socket listening
  var socket = io('http://' + document.domain + ':' + location.port + '/');
  socket.on('connect', function () {
    socket.on('broadcast', function (data) {
      // updateGraph(data);
      $scope.sensorData['Requested Velocity'] = data['requested velocity'];
      $scope.sensorData['Battery'] = (parseInt(data['battery charge']*100/data['battery capacity'])) + ' %';
      $scope.sensorData['Angle'] = data['angle'];
      $scope.sensorData['Wall Seen'] = data['wall seen'];
      $scope.$apply();
    });
    socket.on('trajectory', function (data) {
      $scope.trajectoryChangeFn(data);
    });
  });
  console.log(socket);
});
