#include <Servo.h>

// Khai báo cổng Analog cho cảm biến joystick
const int VRy_pin = A1;
const int Vrx_pin = A0;
// Khai báo cổng PWM cho động cơ servo
const int servoPin = 9;

// Khởi tạo đối tượng Servo
Servo myServo;

int VRy;
int VRx;

void setup() {
  // Khởi tạo cổng đầu vào cho cảm biến joystick
  pinMode(VRy_pin, INPUT);

  // Khởi tạo cổng PWM cho động cơ servo
  myServo.attach(servoPin);

  // Bắt đầu giao tiếp với Serial Monitor
  Serial.begin(9600);
}

void loop() {
  // Đọc giá trị từ cảm biến joystick
  VRy = analogRead(VRy_pin);
  VRx = analogRead(Vrx_pin);
  // Kiểm tra hướng của joystick và điều khiển động cơ
  if (VRy > 612) {
    // Đẩy joystick xuống, quay 180 độ
    Serial.print("Joystick Value Y: ");
    Serial.println(VRy);
    rotateServo(180);
  } else if (VRy < 412) {
    // Đẩy joystick lên, quay 90 độ
    Serial.print("Joystick Value Y: ");
    Serial.println(VRy);
    rotateServo(90);
  }
  if (VRx > 612) {
    // Đẩy joystick sang phải, quay 180 độ
    Serial.print("Joystick Value x: ");
    Serial.println(VRx);
    rotateServo(180);
  } else if (VRx < 412) {
    // Đẩy joystick sang trái, quay 90 độ
    Serial.print("Joystick Value x: ");
    Serial.println(VRx);
    rotateServo(90);
  }

  // Hiển thị giá trị cảm biến trên Serial Monitor

  // Đợi một thời gian ngắn trước khi tiếp tục đọc giá trị từ joystick
  delay(50);
}

// Hàm quay động cơ servo với góc được truyền vào
void rotateServo(int angle) {
  myServo.write(angle);
  delay(1000);       // Đợi 1 giây để đảm bảo servo đã đến góc đó
  myServo.write(0);  // Quay về góc 0 độ
  delay(1000);       // Đợi 1 giây trước khi tiếp tục kiểm tra
}
