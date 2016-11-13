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
    'Angle' : 90,
    'Battery' : 'NA',
    'Wall seen' : false,
    'Distance' : 0,
    "Cliff left": false,  
    "Cliff front right": false,  
    "Cliff right signal": 0,  
    "Cliff front left signal": 0,
    "Cliff right": true, 
    "Cliff front right signal": 0,
    "Cliff left signal": 0, 
    "Cliff front left": false,
    "Bump right": false, 
    "Drop left": false, 
    "Drop right": false, 
    "Bump left": false,
    "Wall signal": 0,
    "Requested left velocity" : 0, 
    "Requested right velocity": 0,
    "Right encoder counts": 0,
    "Left encoder counts": 0,

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
      $scope.sensorData['Cliff left'] = data['cliff left'];
      $scope.sensorData['Cliff right'] = data['cliff right'];
      $scope.sensorData['Cliff front right'] = data['cliff front right'];
      $scope.sensorData['Cliff front right signal'] = data['cliff front right signal'];
      $scope.sensorData['Cliff front left'] = data['cliff front left'];
      $scope.sensorData['Cliff left signal'] = data['cliff left signal'];
      $scope.sensorData['Bump right'] = data['wheel drop and bumps']['bump right'];
      $scope.sensorData['Bump left'] = data['wheel drop and bumps']['bump left'];
      $scope.sensorData['Wall signal'] = data['wall signal'];
      $scope.sensorData['Requested left velocity'] = data['requested left velocity'];
      $scope.sensorData['Requested right velocity'] = data['requested right velocity'];
      $scope.sensorData['Left encoder counts'] = data['left encoder counts'];
      $scope.sensorData['Right encoder counts'] = data['right encoder counts'];
      $scope.sensorData['Drop left'] = data['wheel drop and bumps']['drop left'];
      $scope.sensorData['Drop right'] = data['wheel drop and bumps']['drop right'];

      $scope.$apply();
    });
    socket.on('trajectory', function (data) {
      $scope.trajectoryChangeFn(data);
    });
  });
  console.log(socket);
});
