from flask import Blueprint, jsonify, request
from models.led import Led
from flask_cors import cross_origin
# ở đây nv sẽ gọi model để truy vấn data và return
led_bp = Blueprint('led', __name__)
model = Led()


@led_bp.route('/', methods=['GET'])
# @cross_origin(supports_credentials=True)
def get_users():
    leds = model.get_led()
    return jsonify(leds)


@led_bp.route('/create', methods=['POST'])
def create_led():
    # Lấy dữ liệu từ request
    data = request.get_json()
    name = data.get('name')
    chanpin = data.get('Pin')
    status = data.get('status')
    if name is None or chanpin is None or status is None:
        return jsonify({'error': 'Missing information'}), 400
    try:
        # Kiểm tra xem đã có Pin trong cơ sở dữ liệu hay chưa
        existing_led = model.get_led_by_pin(chanpin)
        if existing_led:
            # Nếu đã tồn tại LED với Pin này, trả về thông báo lỗi
            return jsonify('LED with this Pin already exists'), 409
        else:
            # Nếu chưa có Pin trong cơ sở dữ liệu, thực hiện tạo mới bản ghi LED
            model.create_led(name, chanpin, status)
            return jsonify({'message': 'LED created successfully'}), 201
    except Exception as e:
        return jsonify({'error': 'Failed to create LED', 'details': str(e)}), 500


@led_bp.route('/delete/<int:id>', methods=['DELETE'])
def delete_led(id):
    try:
        result = model.delete(id)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': 'Failed to delete LED', 'details': str(e)}), 500


@led_bp.route('/update/<int:id>', methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_led(id):
    try:
        # Lấy dữ liệu mới từ request
        data = request.get_json()
        name = data.get('name')
        chanpin = data.get('Pin')
        status = data.get('status')
        if name is None or chanpin is None or status is None:
            return jsonify({'error': 'Missing information'}), 400
        # Thực hiện cập nhật LED dựa trên ID
        result = model.update(id, name, chanpin, status)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': 'Failed to update LED', 'details': str(e)}), 500
