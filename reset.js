var create = require('create2'),chalk = require('chalk');
var robot, input = 1;
function main(r) {robot = r;
                  robot.reset();
                 }

function start2() {create.inputMode = 2; create.prompt(function(p){create.open(p,main)});}
start2();


