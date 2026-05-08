from flask import Blueprint, jsonify, request
from models.user import User
from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token

user_bp = Blueprint('user', __name__)
model = User()

@user_bp.route('/user/signup', methods=['POST'])
def register():
    data = request.get_json()
    gmail = data.get('gmail')
    password = data.get('password')
    name = data.get('name')
    
    if not gmail or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    if model.check_user_existence(gmail):
        return jsonify({'message': 'User already exists'}), 409
    
    try:
        role = "user"
        model.create_user(gmail, password, role, name)
        
        # Sử dụng hàm utils bạn đã viết sẵn để gửi mail, tránh viết code mail dài dòng ở đây
        send_registration_email(gmail, password)
        
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'error': 'Failed to register user', 'details': str(e)}), 500

@user_bp.route('/', methods=['GET'])
def get_users():
    users = model.get_users()
    return jsonify(users)
