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
  $scope.sensorData = {
    'Requested Velocity' : 0,
    'Angle' : 90,
    'Battery' : 'NA',
    'Wall Seen' : false

  };

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

  // Socket listening
  var socket = io('http://' + document.domain + ':' + location.port + '/');
  socket.on('connect', function () {
    socket.on('broadcast', function (data) {
      console.log(data)
      // updateGraph(data);
      $scope.sensorData['Requested Velocity'] = data['requested velocity'];
      $scope.sensorData['Battery'] = (parseInt(data['battery charge']*100/data['battery capacity'])) + ' %';
      $scope.sensorData['Angle'] = data['angle'];
      $scope.sensorData['Wall Seen'] = data['wall seen'];
      $scope.$apply();
    });
  });
  console.log(socket);

  // Graphs for live feed
  var updateGraph = function(data) {
    drawSpeed(data["requested velocity"]);
  }

  var emptyContents = function(tagName) {
      document.getElementsByTagName(tagName)[0].innerHTML = "";
  }

  var drawSpeed = function(originalSpeed) {
    if (typeof originalSpeed === "undefined")
      return;
    var MaxSpeed = 500;
    var speed = originalSpeed *2 * Math.PI / MaxSpeed;
    var data = [
      {start: 0, size: speed, color: "red"},
      {start: speed, size: 2*Math.PI - speed, color: "#ece7e7"}
    ];

    var arc = d3.arc()
        .innerRadius(40)
        .outerRadius(100)
          .startAngle(function(d, i){return d.start;})
          .endAngle(function(d, i){return d.start + d.size;})
        ;
    emptyContents("speedChart");
    var chart = d3.select("speedChart").append("svg:svg")
        .attr("class", "chart")
        .attr("width", 420)
        .attr("height", 420).append("svg:g")
        .attr("transform", "translate(200,200)")
        ;

    chart.selectAll("path")
        .data(data)
        .enter().append("svg:path")
        .style("fill", function(d, i){
          return d.color;
        })
        .attr("d", arc);
    chart.append("text")
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .attr("class", "inside")
        .text(function(d) { return originalSpeed; });
  }


});
