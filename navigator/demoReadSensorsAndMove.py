import Navigator
import time
import json

from threading import Thread
import random

nav = Navigator.Navigator()
nav.startSafe()

def readSensors(param):
    while True:
        sensorData = nav.readSensorsData()
        print json.dumps(sensorData, indent=4, sort_keys=False)
        time.sleep(0.5)

def move(x, y):
    print 'move x =', x, 'y =', y
    nav.drive(x, y)

readThread = Thread(target=readSensors, args=('someParam', ))
moveThread = Thread(target=move, args=(0, 0.1))
readThread.start()
moveThread.start()
readThread.join()
moveThread.join()

print 'thread exiting'

