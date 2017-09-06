#from dbase import db
from flask import render_template, request, session
from main import app, db
from models import Day, Deal

def add_validated_deal(day, location, deal):
    valid_deal = Deal(day, location, deal)
    valid_deal.validated = True
    db.session.add(valid_deal)
    db.session.commit()

def add_deal(requested_day, location, deal):
    new_deal = Deal(requested_day, location, deal)
    db.session.add(new_deal)
    db.session.commit()

@app.route('/create', methods=['POST'])
def create_deal():
    if request.method == 'POST':
        # print(request.__dict__)
        json = request.get_json()
        day = json['day']
        location = json['location']
        deal = json['deal']
        # check size of deal/location input, don't trust someone didn't spoof the client
        if len(location) > 50:
            return 'Too long location', 400

        if len(deal) > 200:
            return 'Too long deal', 400

        try:
            add_deal(day, location, deal)
        except ValueError:
            return 'Couldn\'t add deal', 400

        return 'Received'

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
    day_obj = Day.query.filter_by(name=day).first()
    print('day: %s' % day_obj)
    deals = day_obj.deals.all()
    return render_template('base_day.html',
                            day=day,
                            deals=deals)

@app.route('/')
def main():
    return render_template('index.html',
                            weekdays=app.config['WEEKDAYS'])

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return 'Internal Error', 500

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404
