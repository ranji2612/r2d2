import create2api
import time

#Create a Create2. This will automatically try to connect to your
#   robot over serial
bot = create2api.Create2()

#Start the Create2
bot.start()

#Put the Create2 into 'safe' mode so we can drive it
bot.safe()

#Tell the Create2 to drive straight forward at a speed of 100 mm/s
bot.drive_straight(100)

#Wait for 5 seconds
time.sleep(5)

#Tell the Create2 to drive straight backward at a speed of 100 mm/s
bot.drive_straight(-100)

#Wait for 5 seconds
time.sleep(5)

#Stop the bot
bot.drive_straight(0)

#Close the connection
bot.destroy()
