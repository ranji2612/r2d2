app.controller('dashboardCtrl', function($scope,$http,$routeParams) {
  console.log('dashcrl');
  $scope.distance = '50 m';
  // Graphs for live feed
  var updateGraph = function(data) {
    // drawSpeed(data["requested velocity"]);
    drawSpeed("leftSpeedChart", 200);
    drawSpeed("rightSpeedChart", 200);
    drawSpeed("temp", 200);
    // Status Buttons
    statusButtons('cliffLight');
    statusButtons('bumpLight');
    statusButtons('wheelDropLight', 'on');
    statusButtons('wallLight');
  }

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
