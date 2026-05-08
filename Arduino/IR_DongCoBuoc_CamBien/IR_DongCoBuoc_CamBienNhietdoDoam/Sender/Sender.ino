#include <IRremote.h>
#include <DHT.h>
IRsend irsend(9);
#define DHTPIN 7
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
void setup() {
  dht.begin();
  Serial.begin(9600);
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

  // Kiểm tra nếu độ ẩm vượt qua ngưỡng 80
  if (humidity > 80) {
    // Gửi mã IR cho xoay ngược chiều
    irsend.sendRC5(0xB7C75DCE, 13); // Mã giả định cho xoay ngược chiều
  }
  // Khi không vượt qua ngưỡng 80
  else {
    // Gửi mã IR cho xoay cùng chiều
    irsend.sendRC5(0xB8C75F63, 13); // Mã giả định cho xoay cùng chiều
  }
  // Đợi một khoảng thời gian trước khi đọc dữ liệu mới
  delay(1000);
}
