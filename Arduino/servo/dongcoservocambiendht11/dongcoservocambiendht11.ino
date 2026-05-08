#include <DHT.h>
#include <Servo.h>

// Khai báo cổng PWM cho động cơ servo
const int servoPin = 9;

// Khởi tạo đối tượng Servo
Servo myServo;

// Khởi tạo đối tượng DHT với chân kết nối
#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Hàm quay động cơ servo với góc được truyền vào
void rotateServo(int angle) {
  myServo.write(angle);
  delay(1000);  // Đợi 1 giây để đảm bảo servo đã đến góc đó
  myServo.write(0);  // Quay về góc 0 độ
  delay(1000);  // Đợi 1 giây trước khi tiếp tục kiểm tra
}

void setup() {
  // Khởi tạo cổng PWM cho động cơ servo
  myServo.attach(servoPin);

  // Khởi tạo Serial Monitor
  Serial.begin(9600);

  // Khởi tạo đối tượng DHT
  dht.begin();
}

void loop() {
  // Đọc dữ liệu từ cảm biến nhiệt độ độ ẩm DHT11
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // In giá trị lên Serial Monitor
  Serial.print("Nhiệt độ: ");
  Serial.print(temperature);
  Serial.print("°C | Độ ẩm: ");
  Serial.print(humidity);
  Serial.println("%");

  // Kiểm tra nếu độ ẩm vượt qua ngưỡng 85
  if (humidity > 85) {
    // Quay động cơ 180 độ
    rotateServo(180);
    delay(500); // Đợi 0.5 giây
  }
  // Khi không vượt qua ngưỡng 80
  else {
    // Quay động cơ quay 90 độ
    rotateServo(90);
    delay(500); // Đợi 0.5 giây
  }

  // Đợi một khoảng thời gian trước khi đọc dữ liệu mới
  delay(100);
}
