from flask import Blueprint, jsonify, request
from models.user import User
from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
# from emails.until import send_registration_email
# Import đối tượng mail từ app.py

user_bp = Blueprint('user', __name__)
model = User()


# @user_bp.route('/register/register', methods=['POST'])
# def register():
#     data = request.get_json()
#     gmail = data.get('gmail')
#     password = data.get('password')
#     if model.check_user_existence(gmail, password):
#         return jsonify({'message': 'User already exists'}), 409
#     else:
#         try:
#             role = "user"
#             model.create_user(gmail, password, role)
#             # send_registration_email(gmail, password)
#             return jsonify({'message': 'User registered successfully'}), 201
#         except Exception as e:
#             return jsonify({'error': 'Failed to register user', 'details': str(e)}), 500


@user_bp.route('/user/signup', methods=['POST'])
def signup():
    try:
        username = request.json['gmail']
        password = request.json['password']
        result = model.signup(username, password)
        if result:
            gmail, role, name = result  # Trích xuất thông tin về email và role từ kết quả truy vấn
            access_token = create_access_token(identity=username)
            refresh_token = create_refresh_token(identity=username)
            return jsonify({"gmail": gmail, "token": access_token, "role": role, "refresh": refresh_token, "name": name}), 200
        else:
            return jsonify({"message": "Invalid username or password"}), 401
    except Exception as err:
        return jsonify({"message": "Login failed: {}".format(err)}), 500


@user_bp.route('/', methods=['GET'])
def get_users():
    users = model.get_users()
    return jsonify(users)
