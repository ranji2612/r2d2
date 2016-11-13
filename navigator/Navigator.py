import create2api
import time
import math

MAX_VELOCITY = 500

UNIT_ROTATION_TIME = 6.60/360
ROTATION_VELOCITY = 100
STOP_VELOCITY = 0
STRAIGHT_RADIUS = 32767
trajectoryList=[]

class Navigator(object):
    def __init__(self):
        self.orientation = 90
        self.velocity = 0
        self.bot = create2api.Create2()

    def startSafe(self):
        self.bot.start()
        self.bot.safe()

    def stop(self):
        self.bot.stop()

    def destroy(self):
        self.bot.destroy()


    def drive(self, x, y):
        if x == 0 and y == 0:
            self.bot.drive_straight(0)
            return (time.time()*1000, 0, 0)
        if x == 0:
            angle = 90 if y > 0 else -90

        else:
            angle = math.degrees(math.atan(y/x))

            if x >= 0 and y >= 0:
                angle = angle

            elif x <= 0 and y >= 0:
                angle = 180 + angle

            elif x <= 0 and y <= 0:
                angle = 180 + angle

            elif x >= 0 and y <= 0:
                angle = 360 + angle


        velocity = math.sqrt(x**2 + y**2) * MAX_VELOCITY

        print 'angle = ', angle, 'velocity =', velocity

        self.bot.rotateClockwise(self.orientation - angle, ROTATION_VELOCITY, UNIT_ROTATION_TIME, STOP_VELOCITY, STRAIGHT_RADIUS)
        self.orientation = angle

        self.bot.drive_straight(velocity)
        self.velocity = velocity
        timestamp = time.time()*1000
        return (timestamp,velocity,angle)

    def readSensorsData(self):
        self.bot.get_packet(100)
        #print json.dumps(self.bot.sensor_state, indent=4, sort_keys=False)
        return self.bot.sensor_state
