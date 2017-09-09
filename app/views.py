#from dbase import db
from flask import render_template, request, session
from main import app, db
from models import Day, Deal
import config
import emails
import schedule
import time
import logging as log

def send_db_email():
    log.info('Sending email')
    date = time.strftime('%d %b %Y', time.localtime())
    # In future can return these sorted by day
    requested = Deal.query.filter_by(validated=False).all()
    log.info('Requested list: %s' % requested)
    # Don't let it try and render elements that don't exist
    rendered_txt = render_template('email.txt',
        requests=requested, date=date)
    rendered_html = render_template('email.html',
        requests=requested, date=date)
    try:
        # Only delete if there are any
        if requested:
            for deal in rquested:
                db.session.delete(deal)
            # Deal.query.filter_by(validated=False).delete()
            db.session.commit()
    # This is much too broad, change!
    except Exception as e:
        db.session.rollback()
        log.error('Error when deleting requests to send.\nException: %s' % e)
        return -1

    start = time.time()
    emails.send_email('Requested Deals from Gimme Deals! for %s' %date,
                        config.ADMINS[0],
                        config.PERSONAL_EMAIL,
                        rendered_txt,
                        rendered_html)
    log.info('email sent in %d' %(time.time() - start))
    return 0

def thread_run_scheduler():
    with app.app_context():
        while 1:
            schedule.run_pending()
            time.sleep(1)

def add_validated_deal(day, location, deal):
    valid_deal = Deal(day, location, deal)
    valid_deal.validated = True
    db.session.add(valid_deal)
    db.session.commit()

def add_deal(requested_day, location, deal):
    new_deal = Deal(requested_day, location, deal)
    db.session.add(new_deal)
    log.info('Adding deal %s' % new_deal)
    db.session.commit()

@app.route('/create', methods=['POST'])
def create_deal():
    if request.method == 'POST':
        json = request.get_json()
        day = json['day']
        location = json['location']
        deal = json['deal']
        # check size of deal/location input, don't trust someone didn't spoof the client
        if len(location) > 50:
            log.error('location too long: %s' %location)
            return 'Too long location', 400

        if len(deal) > 200:
            log.error('deal too long: %s' %deal)
            return 'Too long deal', 400

        try:
            add_deal(day, location, deal)
        except ValueError as e:
            log.error('create_deal: error: %s' %e)
            return 'Couldn\'t add deal', 400

        return 'Received'

@app.route('/requested')
def show_requested():
    # all() might not be necessary
    requested_list = Deal.query.filter_by(validated=False).all()
    return render_template('requested.html',
                            list=requested_list)

@app.route('/<day>')
def weekday(day):
    if day not in app.config['WEEKDAYS']:
        return render_template('404.html')
    day_obj = Day.query.filter_by(name=day).first()
    log.info('Day requested %s' %day)
    deals = day_obj.deals.all()
    return render_template('base_day.html',
                            day=day,
                            deals=deals)

@app.route('/')
def main():
    date = time.strftime('%a %b-%d-%Y %T', time.localtime())
    log.info('Root accessed at %s from %s'
            % (date, request.remote_addr))
    return render_template('index.html',
                            weekdays=app.config['WEEKDAYS'])

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return 'Internal Error', 500

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404
