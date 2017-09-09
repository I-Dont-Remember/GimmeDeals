from flask import Flask, render_template
from threading import Thread
import models, views
import schedule
import config
import time


app = models.app
db = models.db

if __name__ == '__main__':
    schedule.every().day.at('22:').do(views.send_db_email)
    t = Thread(target=views.thread_run_scheduler)
    t.start()
    log.info('starting at %s' %(time.strftime('%b-%e %T', time.localtime())))
    app.run(debug=False)
