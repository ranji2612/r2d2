var express = require('express');
var app = express.Router();
var create = require('create2'),chalk = require('chalk');
var robot, input = 1;

// Routes for /api/robot
app.get('/start', function(req, res){
  create.inputMode = 2;
  create.prompt(function(p){
    create.open(p,setup)});
  res.json({'status':200, 'action':'start'});
});

app.get('/stop', function(req, res){
  res.json({'status':200,'action':'stop'});
});

app.post('/drive', function(req, res){
  robot.start();
  robot.drive(100,200);
  var velocity = req.body.velocity,
      radius   = req.body.radius;
  console.log(velocity, radius);
  res.json({'status':200, 'action':'drive'});
});


function setup(r) {
  robot = r;
  }


module.exports = app;
