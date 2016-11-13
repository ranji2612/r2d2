app.controller('landingCtrl', function($scope,$http,$routeParams) {
  var options = {
      color: 'black',
      mode: 'static',
      position: {left: '50%', top: '50%'},
      size: 400,
      zone: document.getElementById('static')
  };
  var joystick = nipplejs.create(options);
  var initialPosition = joystick.get(0).position;
  var lastTimeout;

  joystick.on('move end', function (evt, data) {
    // Do something.
    // console.log(evt);
    clearTimeout(lastTimeout);
    lastTimeout = setTimeout(function() {
      var x = data.position.x - initialPosition.x,
          y =  - (data.position.y - initialPosition.y);
      console.log('x = ', x, 'y = ', y);
      $http.post('/api/robot/drive', {'x': x/200, 'y': y/200})
      .success(function(data){
        console.log('success', data);
      })
      .error(function(err){
        console.log('error', err);
      });
    }, 100);
  });
});
