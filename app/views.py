#from dbase import db
from flask import render_template
from main import app, db
from models import Day, Deal

@app.route('/requested')
def show_requested():
    # all() might not be necessary
    requested_list = Deal.query.filter_by(validated=False).all()
    print(requested_list)
    return render_template('requested.html',
                            list=requested_list)

@app.route('/<day>')
def weekday(day):
    if day not in app.config['WEEKDAYS']:
        return render_template('404.html')
    return render_template('base_day.html',
                            day=day)

@app.route('/')
def main():
    return render_template('index.html',
                            weekdays=app.config['WEEKDAYS'])
