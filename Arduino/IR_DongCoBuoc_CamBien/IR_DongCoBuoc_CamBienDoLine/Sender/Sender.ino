#include <IRremote.h>
IRsend irsend(9);
const int doline_pin = 7;
void setup() {
  Serial.begin(9600);
  pinMode(doline_pin, INPUT);
}

void loop() {
  int doline_value = digitalRead(doline_pin);
  if (doline_value == 1) {
    // Gửi mã IR cho xoay ngược chiều
    irsend.sendRC5(0xB7C75DCE, 13); // Mã giả định cho xoay ngược chiều
  } else{
    // Gửi mã IR cho xoay cùng chiều
    irsend.sendRC5(0xB8C75F63, 13); // Mã giả định cho xoay cùng chiều
  }

  // In khoảng cách ra cổng Serial
  Serial.print("Dò line value: ");
  Serial.println(doline_value);
  delay(500);
}
