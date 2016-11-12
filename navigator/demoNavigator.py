import Navigator
import time

nav = Navigator.Navigator()
nav.startSafe()

while True:
    x = input()
    if x == -1:
        break

    y = input()

    nav.drive(x, y)

    time.sleep(5)

    nav.drive(0, 0)




