import os
from flask import Flask, jsonify
from flask_mail import Mail
from flask_cors import CORS
from dotenv import load_dotenv
from utils.getMacAddress import get_computer_mac
import threading
# Import configurations
from config.smtp import configure_mail
from auth.autho import configure_jwt

# Import Blueprints
from controllers.biensoxe_controller import product_bp
from controllers.user_controller import user_bp
from controllers.led_controller import led_bp
from scripts.test_modelOCR import camera_detect, model_character
load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

# Khởi tạo Mail
mail = Mail()
configure_mail(app)
mail.init_app(app)

# Cấu hình JWT
configure_jwt(app)

# Đăng ký Blueprints
app.register_blueprint(product_bp, url_prefix='/biensoxe')
app.register_blueprint(led_bp, url_prefix='/led')
app.register_blueprint(user_bp, url_prefix='/user')

@app.route('/sensor/check_gas', methods=['POST'])
def check_gas():
    from flask import request
    data = request.get_json()
    gas_value = float(data.get('gasValue', 0))
    alert = gas_value > 400
    return jsonify({
        'alert': alert, 
        'message': 'Fire alert!' if alert else 'Normal'
    })

@app.route('/sensor/check_temp', methods=['POST'])
def check_temp():
    from flask import request
    data = request.get_json()
    temp_value = float(data.get('tempValue', 0))
    
    # Nhiệt độ > 50 độ là cảnh báo
    alert = temp_value > 50
    return jsonify({
        'alert': alert,
        'current_temp': temp_value,
        'message': 'Warning: High Temperature!' if alert else 'Normal'
    })


camera_running = False
@app.route('/start_camera', methods=['POST'])
def start_camera_route():
    current_mac = get_computer_mac()
    global camera_running
    if not camera_running:
        thread = threading.Thread(target=camera_detect, args=(model_character, current_mac))
        thread.start()
        camera_running = True
        return jsonify({"message": "Camera detection started"}), 200
    else:
        return jsonify({"message": "Camera is already running"}), 200

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 4000))
    app.run(debug=True, port=port)