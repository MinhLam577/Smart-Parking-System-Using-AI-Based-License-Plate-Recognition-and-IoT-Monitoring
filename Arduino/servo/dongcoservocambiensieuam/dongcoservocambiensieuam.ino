#include <Servo.h>

const int trigPin = 5;
const int echoPin = 3;
const int servoPin = 9;

long duration;
int distance;

Servo myServo;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  myServo.attach(servoPin);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;

  Serial.print("Distance = ");
  Serial.print(distance);
  Serial.println(" cm");

  if (distance > 10) {
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
