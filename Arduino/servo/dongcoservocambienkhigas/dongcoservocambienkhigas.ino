#include <Servo.h>

const int gasSensorPin = A0;
const int servoPin = 9;
int gasSensorValue;

Servo myServo;

void setup() {
 pinMode(gasSensorPin, INPUT);
 myServo.attach(servoPin);
 Serial.begin(9600);
}

void loop() {
gasSensorValue = analogRead(gasSensorPin);
// Print the gas sensor value to the serial monitor.
  Serial.print("Gas sensor value = ");
  Serial.println(gasSensorValue);
  delay(500);
  
   if (gasSensorValue > 100)  {
    rotateServo(180);
  } else {
    rotateServo(90);
  }

  delay(50);
}

void rotateServo(int angle) {
  myServo.write(angle);
  delay(500);
  myServo.write(0);
  delay(500);
}
