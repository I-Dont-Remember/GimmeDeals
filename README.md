# GimmeDeals
Small webapp to collect deals in Madison

Uses Flask-Mail with schedule and Flask-SQLAlchemy with sqllite for database

**Structure**
```text
gimmeDeals/  
  app/  
    config.py  
    emails.py  
    main.py  
    makedb.py  
    models.py  
    tests.py  
    views.py  
    static/
    templates/

  .gitignore  
  Dockerfile  
  Makefile  
  README.md  
  requirements.txt  
  venv/  
    <virtual environment files>  
```

**Config.py Contents**
basedir = os.path.abspath(os.path.dirname(__file__))  
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'deals_app.db')  
SQLALCHEMY_TRACK_MODIFICATIONS = False  
WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']  
DEBUG = False  
secret_key = 'You cant get me $$$'  
DEALS_FILE = 'app/deals.ini'  

**email server**
MAIL_SERVER = 'smtp.gmail.com'  
MAIL_PORT = 465  
MAIL_USE_TLS = False  
MAIL_USE_SSL = True  
MAIL_USERNAME = 'ideally get this from env variables'  
MAIL_PASSWORD = 'ideally get this from env variables'  

ADMINS = ['gmail']  
PERSONAL_EMAIL = ['email']  

TODO:
* Alerts on frontend based on success of input from form  

* Dont forget flask has before_request options you can use  

* ip limiting so we don't get spammed with 5000 requests an hour  
  - http://flask.pocoo.org/docs/0.12/quickstart/#accessing-request-data
