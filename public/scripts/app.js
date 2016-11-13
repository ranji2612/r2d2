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
    'Requested velocity' : 0,
    'Angle' : 0,
    'Battery' : 'NA',
    'Wall seen' : false,
    'Distance' : 0,
    "Cliff left": true,
    "Cliff front right": true,
    "Cliff right signal": 0,
    "Cliff front left signal": 0,
    "Cliff right": true,
    "Cliff front right signal": 0,
    "Cliff left signal": 3,
    "Cliff front left": true,
    "Bump right": true,
    "Drop left": false,
    "Drop right": false,
    "Bump left": true,
    "Wall signal": 0,
    "Requested left velocity" : 0,
    "Requested right velocity": 0,
    "Right encoder counts": 50127,
    "Left encoder counts": 7657,

  };

  $scope.trajectoryChangeFn = function(data) {
    console.log('parent');
  };

  // Socket listening
  var socket = io('http://' + document.domain + ':' + location.port + '/');
  socket.on('connect', function () {
    socket.on('broadcast', function (data) {
      // updateGraph(data);
      $scope.sensorData['Requested velocity'] = data['requested velocity'];
      $scope.sensorData['Battery'] = (parseInt(data['battery charge']*100/data['battery capacity'])) + ' %';
      $scope.sensorData['Angle'] = data['angle'];
      $scope.sensorData['Wall seen'] = data['wall seen'];
      $scope.sensorData['Cliff Left'] = data['cliff left'];
      $scope.sensorData['Cliff right'] = data['cliff right'];
      $scope.sensorData['Cliff front right'] = data['cliff front right'];
      $scope.sensorData['Cliff front right signal'] = data['cliff front right signal'];
      $scope.sensorData['Cliff front left'] = data['cliff front left'];
      $scope.sensorData['Cliff left signal'] = data['cliff left signal'];
      $scope.sensorData['Bump right'] = data['bump right'];
      $scope.sensorData['Bump left'] = data['bump left'];
      $scope.sensorData['Wall signal'] = data['wall signal'];
      $scope.sensorData['Requested left velocity'] = data['requested left velocity'];
      $scope.sensorData['Requested right velocity'] = data['requested right velocity'];
      $scope.sensorData['Left encoder counts'] = data['left encoder counts'];
      $scope.sensorData['Right encoder counts'] = data['right encoder counts'];
      $scope.$apply();
    });
    socket.on('trajectory', function (data) {
      $scope.trajectoryChangeFn(data);
    });
  });
  console.log(socket);
});
