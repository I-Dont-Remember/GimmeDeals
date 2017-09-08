# Method borrowed from miguel grinbregs excellent tutorials
# https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xi-email-support

from flask_mail import Message
from models import mail, app


def send_email(subject, sender, recipients, text_body, html_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    msg.html = html_body
    print(app.config['MAIL_USERNAME'])
    print(app.config['MAIL_PASSWORD'])
    mail.send(msg)
