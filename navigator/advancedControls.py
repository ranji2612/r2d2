import create2api
import time

bot = create2api.Create2()

bot.start()

bot.safe()

bot.play_test_sound();

bot.digit_led_ascii('    ');

bot.destory();
