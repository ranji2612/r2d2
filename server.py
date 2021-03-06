#!/usr/bin/env python2.7
# Populate dropdown even after error occurs
"""
Columbia's COMS W4111.001 Introduction to Databases
Example Webserver

To run locally:

    python server.py

Go to http://localhost:8111 in your browser.

A debugger such as "pdb" may be helpful for debugging.
Read about it online.
"""
#from create2api import Create2
import time
import json
from threading import Thread
import os
from flask import Flask, request, render_template, g, session,redirect, Response, send_from_directory, jsonify
from navigator import Navigator
# from __future__ import print_function
import sys
from flask_socketio import SocketIO

tmpl_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public')
app = Flask(__name__, template_folder=tmpl_dir, static_url_path='/public')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
# Bot object
bot = Navigator.Navigator()
trajectoryList = []

@app.before_request
def before_request():

#   try:
#     g.conn = engine.connect()


#   except:
#     print "uh oh, problem connecting to database"
#     import traceback; traceback.print_exc()
#     g.conn = None
    pass

@app.teardown_request
def teardown_request(exception):

#   try:
#     g.conn.close()
#     logout()
#     session.pop('username', None)
#     session.clear()
#   except Exception as e:
    pass




# @app.after_request
# def after_request():
#     session.clear()

@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('public', path)

# Socket things
@socketio.on('broadcast')
def handle_my_custom_event(data):
    emit('broadcast', data, broadcast=True)

@socketio.on('trajectory')
def handle_my_custom_event(data):
    emit('trajectory', data, broadcast=True)

@app.route('/')
def index():
    setup();
    return render_template("index.html");
    #return app.send_static_file('index.html')

@app.route('/test/')
def test():
    socketio.emit('broadcast', myData)
    return "yo momma so fat"

@app.route('/basic/')
def basic():
    bot = Navigator.Navigator()
    bot.startSafe();
    bot.drive(0,0);
    time.sleep(5);
    bot.destroy()
    return 'wow'

def getFakeSensorData():
    sensorData = {}
    sensorData['angle'] = random.randint(0, 360)
    sensorData['distance'] = random.randint(0, 100)
    return sensorData

def readSensors(param):
    while True:
        sensorData = bot.readSensorsData()
        #sensorData = getFakeSensorData()
#        f = open("values.txt","a")
#        f.write(json.dumps(sensorData, indent=4, sort_keys=False))
        socketio.emit('broadcast', sensorData)
        #print json.dumps(sensorData, indent=4, sort_keys=False)
        time.sleep(1)


# TRY WITH SLASH AT END OF ROUTE

#@app.route('/api/robot/start/')

def setup():
    bot.startSafe();
    thread = Thread(target=readSensors, args=('someParam', ))
    thread.start()
    return "Success"

@app.route('/api/robot/reset')
def reset1():
    #bot = Navigator.Navigator();
    #bot.startSafe();
    bot.reset();
    return "Success"

@app.route('/api/robot/stop')
def stop():
    bot.stop();

@app.route('/api/robot/drive', methods=['POST'])
def drive():
    bot.startSafe();
    content = request.get_json(silent=False)
    x = content["x"]
    y = content["y"]
    # Add to trajectory list if success
    botResp = bot.drive(float(x),float(y))
    if botResp != None:
        trajectoryList.append(botResp)
        socketio.emit('trajectory', {'data': botResp})
        # socketio.emit('trajectory', botResp)
    print float(x),float(y)
    return "Success"

@app.route('/api/robot/map')
def getPath():
    return jsonify(result=trajectoryList)

if __name__ == "__main__":
  import click

  @click.command()
  @click.option('--debug', is_flag=True)
  @click.option('--threaded', is_flag=True)
  @click.argument('HOST', default='0.0.0.0')
  @click.argument('PORT', default=8111, type=int)

  def run(debug, threaded, host, port):

    HOST, PORT = host, port
    print "running on %s:%d" % (HOST, PORT)
    sys.path.append('/Users/Siri/Documents/ms/Fall2016/yhack/r2d2/navigator')
    # app.run(host=HOST, port=PORT, debug=True, threaded=threaded)
    socketio.run(app, host=HOST, port=PORT, debug=True)

  run()
