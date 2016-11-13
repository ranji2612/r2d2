app.controller('trajectoryCtrl', function($scope,$http,$routeParams) {
  var canvas = document.getElementById('map'),
        ctx = canvas.getContext('2d'),
        line = new Line(ctx),
        img = new Image;
  var velocityScale = 100;
  $scope.width = 0;

    ctx.strokeStyle = '#aaa';
    ctx.font="20px Tahoma";
    ctx.fillStyle = 'white';
    img.onload = start;

    var isDrawing = false,
    		startX = 0,
        startY = 0;

    function Line(ctx) {
      var me = this;

      this.x1 = 0;
      this.x2 = 0;
      this.y1 = 0;
      this.y2 = 0;

      this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(me.x1, me.y1);
        ctx.lineTo(me.x2, me.y2);
        ctx.stroke();
      }
    }

    /* Graph Helper functions */
    function drawLine(x1, y1, x2, y2) {
    	line.x1 = x1;
      line.y1 = y1;
      line.x2 = x2;
      line.y2 = y2;
      line.draw();
    }
    function start() {
      ctx.canvas.width  = document.getElementById('canvasHolder').clientWidth;
      ctx.canvas.height = document.getElementById('canvasHolder').clientWidth;
      $scope.width = document.getElementById('canvasHolder').clientWidth
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, map.width, map.height);
    }

    var data = [[Date.now() - 5000, 500, 90]];
    var plotMap = function() {
      // Clear Graph
      ctx.drawImage(img, 0, 0, map.width, map.height);
      // Draw axis
      ctx.strokeStyle = '#bbb';
      drawLine($scope.width/2, 0, $scope.width/2, $scope.width);
      ctx.strokeStyle = '#bbb';
      drawLine(0, $scope.width/2, $scope.width, $scope.width/2);
      // Draw
      ctx.strokeStyle = '#f0f';
      var x = $scope.width/2,
          y = $scope.width/2;
      var i=0,v = 0, t = 0, ang = 0, d= 0;
      var ct = Date.now()/1000;

      for(i=0; i<data.length - 1; i++) {
        ct = data[i+1][2];
        d = data[i][1] * ((ct - data[i][0])/1000)/ velocityScale;
        nx = x + d * Math.cos((ang - data[i][2]) * Math.PI / 180);
        ny = y + d * Math.sin((ang - data[i][2]) * Math.PI / 180);
        console.log(d, data[i][1],(ct - data[i][0]/1000), (ang - data[i][2]));
        console.log(x,y,nx,ny);
        drawLine(x,y, nx, ny);
      }
      ct = Date.now()/1000;
      d = data[i][1] * (ct - data[i][0]/1000)/ velocityScale;
      nx = x + d * Math.cos((ang - data[i][2]) * Math.PI / 180);
      ny = y + d * Math.sin((ang - data[i][2]) * Math.PI / 180);
      console.log(d, data[i][1],(ct - data[i][0]/1000), (ang - data[i][2]));
      console.log(x,y,nx,ny);
      drawLine(x,y, nx, ny);
    }

    // init
    start();
    console.log(ctx.canvas);
    plotMap();
});
