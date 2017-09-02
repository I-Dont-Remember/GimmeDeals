from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)

class Day(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True)
    deals = db.relationship('Deal', backref='day', lazy='dynamic')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Day %r %d>' % (self.name, self.id)

# Is it more efficient to have the boolean to tell if it is still a requested deal, or would a separate class be more efficient for searches?
class Deal(db.Model):
    # __searchable__ = ['deal']
    id = db.Column(db.Integer, primary_key=True)
    validated = db.Column(db.Boolean, default=False)
    location = db.Column(db.String(50), index=True)
    deal = db.Column(db.String(200), index=True)
    day_id = db.Column(db.Integer, db.ForeignKey('day.id'))

    def __init__(self, day, location, deal):
        self.validated = False
        self.location = location
        self.deal = deal
        try:
            self.day_id = (Day.query.filter_by(name=day).first()).id
        except Exception as e:
            # Broad to be able to find what is thrown, will change once we know what it is called
            raise ValueError

    def __repr__(self):
        return '<Deal valid:%s %.35s' % (self.validated, self.deal)
