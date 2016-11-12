app.controller('landingCtrl', function($scope,$http,$routeParams) {
  var options = {
      color: 'black',
      mode: 'static',
      position: {left: '50%', top: '50%'},
      size: 400,
      zone: document.getElementById('static')
  };
  var static = nipplejs.create(options);
});
