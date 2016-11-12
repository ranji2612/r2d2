var create = require('create2'),chalk = require('chalk');
var robot, input = 1;
function main(r) {robot = r;
                  //robot.reset();
                  robot.start();
                  
                 robot.safe();
                 //robot.clean();
                 robot.drive(100,1000);
                  //robot.reset();
//                setTimeout(function(){
//                    robot.stop();
//                }, 10000);
                //robot.stop();
                 }

function start2() {create.inputMode = 2; create.prompt(function(p){create.open(p,main)});}
start2();


