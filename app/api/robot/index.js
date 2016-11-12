var express = require('express');
var app = express.Router();

// Routes for /api/robot
app.get('/start', function(req, res){
  res.json({'status':200, 'action':'start'});
});

app.get('/stop', function(req, res){
  res.json({'status':200,'action':'stop'});
});

app.post('/drive', function(req, res){
  var velocity = req.body.velocity,
      radius   = req.body.radius;
  console.log(velocity, radius);
  res.json({'status':200, 'action':'drive'});
});

module.exports = app;
