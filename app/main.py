from flask import Flask, render_template#send_file
from threading import Thread
import models, views
import schedule
import config
import time


app = models.app
db = models.db

if __name__ == '__main__':
    schedule.every(2).minutes.do(views.send_db_email)
    t = Thread(target=views.thread_run_scheduler)
    t.start()
    print('starting:' + time.strftime('%H%M%S', time.localtime()))
    app.run(debug=False)
