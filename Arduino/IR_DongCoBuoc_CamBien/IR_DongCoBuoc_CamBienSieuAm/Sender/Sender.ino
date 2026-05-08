#include <IRremote.h>
IRsend irsend(9);
const int trigPin = 5;
const int echoPin = 6;
long duration;
int distance;
void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;
  if (distance < 30) {
    // Gửi mã IR cho xoay ngược chiều
    irsend.sendRC5(0xB7C75DCE, 13); // Mã giả định cho xoay ngược chiều
  } else{
    // Gửi mã IR cho xoay cùng chiều
    irsend.sendRC5(0xB8C75F63, 13); // Mã giả định cho xoay cùng chiều
  }

  // In khoảng cách ra cổng Serial
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println("cm");
  delay(500);
}
