#include <Servo.h>

// Khai báo cổng Analog cho cảm biến dò line
const int anh_sang_pin = 7;

// Khai báo cổng PWM cho động cơ servo
const int servoPin = 9;

// Khởi tạo đối tượng Servo
Servo myServo;

void setup() {
  // Khởi tạo cổng đầu vào cho cảm biến dò line
  pinMode(anh_sang_pin, INPUT);

  // Khởi tạo cổng PWM cho động cơ servo
  myServo.attach(servoPin);
  Serial.begin(9600);
}
// Hàm quay động cơ servo với góc được truyền vào
void rotateServo(int angle) {
  myServo.write(angle);
  delay(1000);  // Đợi 1 giây để đảm bảo servo đã đến góc đó
  myServo.write(0);  // Quay về góc 0 độ
  delay(1000);  // Đợi 1 giây trước khi tiếp tục kiểm tra
}
void loop() {
  // Đọc giá trị từ cảm biến dò line
  int anhsang_value = digitalRead(anh_sang_pin);

  // Kiểm tra điều kiện và thực hiện quay servo tương ứng
  if (anhsang_value == 0) {
    rotateServo(90);  // Quay 90 độ
  } else {
    rotateServo(180);  // Quay 180 độ
  }
  Serial.print("Anh sang value: ");
  Serial.println(anhsang_value);
  delay(500);
}
