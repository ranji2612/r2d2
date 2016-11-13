app.controller('dashboardCtrl', function($scope,$http,$routeParams) {
  console.log('dashcrl');
  $scope.distance = '0 m';

  // Graphs for live feed
  var updateGraph = function(data) {
    // drawSpeed(data["requested velocity"]);
    drawSpeed("leftSpeedChart", $scope.$parent.sensorData['Requested left velocity']);
    drawSpeed("rightSpeedChart", $scope.$parent.sensorData['Requested right velocity']);
    angleDiag("angleChart", $scope.$parent.sensorData['Angle']);
    // Status Buttons
    var cliff = 'off';
    if($scope.$parent.sensorData["Cliff left"] == true || $scope.$parent.sensorData["Cliff right"] == true){
      cliff = 'on';}
    statusButtons('cliffLight',cliff);
    var bump = 'off';
    if($scope.$parent.sensorData["Bump left"] == true || $scope.$parent.sensorData["bump right"] == true){
      bump = 'on';}
    statusButtons('bumpLight',bump);
    var wheel = 'off';
    if($scope.$parent.sensorData["Drop left"] == true || $scope.$parent.sensorData["drop right"] == true){
      wheel = 'on';}
    statusButtons('wheelDropLight', wheel);
    var wall = 'off';
    if($scope.$parent.sensorData["Wall seen"] == true){
      wall= 'on';}
    statusButtons('wallLight', wall);
  }

  $scope.localUpdate = function() {
    console.log('local update');
    updateGraph();
  };

  $scope.$parent.updateDashboard = $scope.localUpdate();

  var emptyContents = function(tagName) {
      document.getElementsByTagName(tagName)[0].innerHTML = "";
  }

  var drawSpeed = function(tagName, originalSpeed) {
    if (typeof originalSpeed === "undefined")
      return;
    var MaxSpeed = 500;
    var speed = originalSpeed *2 * Math.PI / MaxSpeed;
    var data = [
      {start: 0, size: speed, color: "red"},
      {start: speed, size: 2*Math.PI - speed, color: "#ece7e7"}
    ];

    var arc = d3.arc()
        .innerRadius(60)
        .outerRadius(80)
          .startAngle(function(d, i){return d.start;})
          .endAngle(function(d, i){return d.start + d.size;})
        ;
    emptyContents(tagName);
    var chart = d3.select(tagName).append("svg:svg")
        .attr("class", "chart")
        .attr("width", 200)
        .attr("height", 200).append("svg:g")
        .attr("transform", "translate(100,100)")
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

  var angleDiag = function(tagName, angle) {
    var arrow = (90 - angle - 1) * Math.PI / 180;
    var size = (2) * Math.PI / 180;
    var data = [
      {start: arrow, size: size, color: "#c70909"},
      {start: arrow + size, size: 2*Math.PI - size, color: "#ece7e7"}
    ];

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(80)
          .startAngle(function(d, i){return d.start;})
          .endAngle(function(d, i){return d.start + d.size;})
        ;
    emptyContents(tagName);
    var chart = d3.select(tagName).append("svg:svg")
        .attr("class", "chart")
        .attr("width", 200)
        .attr("height", 200).append("svg:g")
        .attr("transform", "translate(100,100)")
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
        .text(function(d) { return angle; });
  }

  var statusButtons = function(tagName, status) {
    var color = '#C7C4C4';
    if (status === 'on') {
      color = '#4DE050';
    } else {
      status = "off";
    }
    var data = [
      {start: 0, size: 2*Math.PI, color: color}
    ];

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(50)
          .startAngle(function(d, i){return d.start;})
          .endAngle(function(d, i){return d.start + d.size;})
        ;
    emptyContents(tagName);
    var chart = d3.select(tagName).append("svg:svg")
        .attr("class", "chart")
        .attr("width", 100)
        .attr("height", 100).append("svg:g")
        .attr("transform", "translate(50,50)")
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
        .text(function(d) { return status; });
  }

  updateGraph();
});
