#! venv/bin/python
import os
import unittest
import config
from models import app, db, Day, Deal


# http://flask.pocoo.org/docs/0.12/quickstart/#accessing-request-data
# testing requests break, can use test_request_context

#!!!!!!!!!!!!!!!!! These tests are not currently in functional state!!!!!!

class TestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(config.basedir, 'test.db')
        self.app = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_deal_creation(self):
        day = Day('Monday')
        db.session.add(day)
        db.session.commit()
        assert day.name == 'Monday'
        new_deal = Deal('Monday', 'Jordans', 'Free Food')
        db.session.add(new_deal)
        db.session.commit()
        assert new_deal.day.name == 'Monday'
        assert len(new_deal.location) < 50
        assert len(new_deal.deal) < 200

    def test_invalid_deal_creation(self):
        new_deal = Deal('DoesntExist', 'Jordans', 'Free Food')
        assert new_deal == None

if __name__ == '__main__':
    unittest.main()
