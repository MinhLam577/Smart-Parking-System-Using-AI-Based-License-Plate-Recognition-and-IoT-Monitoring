from flask_mail import Message
from app import mail
def send_registration_email(gmail, password):
    msg = Message('Welcome to our platform!',
                  sender='nguyenhuynhan.dn@gmail.com', recipients=[gmail, password])
    msg.body = f"Username: {gmail}\nPassword: {password}"
    mail.send(msg)
