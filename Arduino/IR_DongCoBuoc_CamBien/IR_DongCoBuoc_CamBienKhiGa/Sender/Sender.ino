#include <IRremote.h>
IRsend irsend(9);
const int gas_pin = 7;
void setup() {
  Serial.begin(9600);
  pinMode(gas_pin, INPUT);
}

void loop() {
  int gas_value = digitalRead(gas_pin);
  if (gas_value == 1) {
    // Gửi mã IR cho xoay ngược chiều
    irsend.sendRC5(0xB7C75DCE, 13); // Mã giả định cho xoay ngược chiều
  } else{
    // Gửi mã IR cho xoay cùng chiều
    irsend.sendRC5(0xB8C75F63, 13); // Mã giả định cho xoay cùng chiều
  }

  // In khoảng cách ra cổng Serial
  Serial.print("khí ga value: ");
  Serial.println(gas_value);
  delay(500);
}
