from models.biensoxe import Bienso
from flask import Blueprint, jsonify, request
import sys

product_bp = Blueprint('biensoxe', __name__)
model = Bienso()

@product_bp.route('/')
def get_products():
    products = model.get_biensos()
    return jsonify(products)

@product_bp.route('/create', methods=['POST'])
def create():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Yêu cầu không hợp lệ"}), 400

    mabien = data.get('mabien')
    nguoidangki = data.get("nguoidangki")
    mathe = data.get('mathe')

    if not mabien or not nguoidangki:
        return jsonify({"error": "Thiếu thông tin biển số hoặc người đăng kí"}), 400

    # Kiểm tra xem biển số đã tồn tại chưa
    checkMabien = model.getby_mabien(mabien)
    checkMathe = model.getby_mathe(mathe)
    if checkMabien:
        return jsonify("Biển số đã tồn tại"), 409
    if checkMathe:
        return jsonify("Mã thẻ đã tồn tại"), 409
    else:
        model.createBienso(mabien, nguoidangki, mathe)
        return jsonify({"message": "Tạo biển số thành công"}), 200


@product_bp.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    result = model.deleteBienso(id)
    if "Message" in result and "thất bại" in result["Message"].lower():
        # Trả về mã lỗi 400 cho lỗi
        return jsonify({"Message": "Xóa thất bại"}), 400
    else:
        return jsonify({"Message": "Xóa thành công"})


@product_bp.route('/update/<int:id>', methods=["PUT"])
def update(id):
    try:
        # Lấy dữ liệu mới từ request
        data = request.get_json()
        mabien = data.get('mabien')
        nguoidangki = data.get('nguoidangki')
        mathe = data.get('mathe')
        # Kiểm tra xem thông tin cần thiết đã được cung cấp chưa
        if mabien is None or nguoidangki is None:
            return jsonify({'error': 'Missing information'}), 400
        # Thực hiện cập nhật LED dựa trên ID
        result = model.updateBienso(id, mabien, nguoidangki, mathe)
        if result:
            return jsonify("Cập nhật thành công"), 200
        else:
            return jsonify("Cập nhật thất bại")
    except Exception as e:
        return jsonify({'error': 'Failed to update LED', 'details': str(e)}), 500

@product_bp.route('/search/<string:id>', methods=["GET"])
def search(id):
    try:
        checkMabien = model.getby_mathe(id)
        if (checkMabien):
            return jsonify("Tìm kiếm thành công")
        else:
            return jsonify("Tìm kiếm ko thanhg công ")
    except Exception as e:
        return jsonify({'error': 'Failed to update LED', 'details': str(e)}), 500
