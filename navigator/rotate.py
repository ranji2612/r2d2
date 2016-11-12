import create2api
import time

STOP_VELOCITY = 0
STRAIGHT_RADIUS = 32767

ROTATION_VELOCITY = 100
UNIT_ROTATION_TIME = 6.60/360.0

bot = create2api.Create2()

bot.start()

bot.safe()

def rotate(angle):
    timeToRotate = abs(angle * UNIT_ROTATION_TIME)

    if angle >= 0:
        bot.drive(ROTATION_VELOCITY, -1)
    else:
        bot.drive(ROTATION_VELOCITY, 1)

    print timeToRotate

    time.sleep(timeToRotate)

    bot.drive(STOP_VELOCITY, STRAIGHT_RADIUS)

rotate(input())

bot.destroy()
