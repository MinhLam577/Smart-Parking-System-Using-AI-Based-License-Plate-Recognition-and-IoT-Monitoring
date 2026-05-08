#include <IRremote.h>
IRsend irsend(9);
const int anh_sang_pin = 7;
void setup() {
  Serial.begin(9600);
  pinMode(anh_sang_pin, INPUT);
}

void loop() {
  int anh_sang_value = digitalRead(anh_sang_pin);
  if (anh_sang_value == 1) {
    // Gửi mã IR cho xoay ngược chiều
    irsend.sendRC5(0xB7C75DCE, 13); // Mã giả định cho xoay ngược chiều
  } else{
    // Gửi mã IR cho xoay cùng chiều
    irsend.sendRC5(0xB8C75F63, 13); // Mã giả định cho xoay cùng chiều
  }

  // In khoảng cách ra cổng Serial
  Serial.print("Ánh sáng value: ");
  Serial.println(anh_sang_value);
  delay(500);
}
