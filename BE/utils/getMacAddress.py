from getmac import get_mac_address as get_mac

def get_computer_mac():
    # Lấy địa chỉ MAC của interface mặc định
    mac = get_mac()
    return mac.upper() if mac else "Không tìm thấy"