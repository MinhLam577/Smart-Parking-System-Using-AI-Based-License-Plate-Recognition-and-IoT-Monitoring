#include <IRremote.h>
IRsend irsend(9);
const int VRx_pin = A0;
const int VRy_pin = A1;
int VRx, VRy;
void setup() {
  Serial.begin(9600);
}

void loop() {
  VRx = analogRead(VRx_pin);
  VRy = analogRead(VRy_pin);

  // In giá trị cảm biến lên Serial Monitor
  Serial.print("X: ");
  Serial.print(VRx);
  Serial.print("\tY: ");
  Serial.println(VRy);

  // Kiểm tra hướng của joystick và điều khiển động cơ
  if (VRy > 612) {
    // Gửi mã IR cho xoay cùng chiều 180
    irsend.sendRC5(0xA1B2C3D4, 13); // Mã giả định cho xoay ngược chiều
  } else if (VRy < 412) {
    // Gửi mã IR cho xoay nguoc chiều 180
    irsend.sendRC5(0xE5F6A7B8, 13); // Mã giả định cho xoay cùng chiều
  } 
  if (VRx > 612) {
    // Gửi mã IR cho xoay ngược  chiều 90
    irsend.sendRC5(0xB7C75DCE, 13); // Mã giả định cho xoay ngược chiều
  } else if (VRx < 412) {
    // Gửi mã IR cho xoay cùng chiều 90
    irsend.sendRC5(0xB8C75F63, 13); // Mã giả định cho xoay cùng chiều
  }

  // Ngừng để giữ giá trị hiển thị trên Serial Monitor dễ đọc
  delay(500);
}
