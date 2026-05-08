from flask_mail import Message

def send_registration_email(recipient_email, password):
    from app import mail
    msg = Message(
        subject='Welcome to our platform!',
        sender='minh32405@gmail.com', 
        recipients=[recipient_email] 
    )
    
    # Nội dung gửi cho người dùng
    msg.body = f"Chào mừng bạn!\n\nThông tin đăng nhập của bạn:\nUsername: {recipient_email}\nPassword: {password}"
    
    try:
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Lỗi gửi mail: {e}")
        return False