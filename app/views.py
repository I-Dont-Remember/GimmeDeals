#from dbase import db
from flask import render_template
from main import app, db
from models import Day

@app.route('/<day>')
def weekday(day):
    if day not in app.config['WEEKDAYS']:
        return render_template('404.html')
    return render_template('base_day.html',
                            day=day)

@app.route('/')
def main():
    # day = Day(name='today')
    # db.session.add(day)
    # db.session.commit()
    return render_template('index.html',
                            weekdays=app.config['WEEKDAYS'])
@app.route('/today')
def test():
    val = Day.query.all()
    print(val)
    return render_template('index.html',
                            weekdays=val)
