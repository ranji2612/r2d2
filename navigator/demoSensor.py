import Navigator
import time
import json

from threading import Thread
import random

nav = Navigator.Navigator()
nav.startSafe()

def getFakeSensorData():
    sensorData = {}
    sensorData['angle'] = random.randint(0, 360)
    sensorData['distance'] = random.randint(0, 100)
    return sensorData

def readSensors(param):
    while True:
        sensorData = nav.readSensorsData()
        #sensorData = getFakeSensorData()
        print json.dumps(sensorData, indent=4, sort_keys=False)
        time.sleep(1)

thread = Thread(target=readSensors, args=('someParam', ))
thread.start()
thread.join()

print 'thread exiting'

