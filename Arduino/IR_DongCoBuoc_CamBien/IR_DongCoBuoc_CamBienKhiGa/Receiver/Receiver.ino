#include <Stepper.h>
#include <IRremote.h>

const int stepsPerRevolution = 2048; // Số bước mỗi vòng quay
const int step = map(90, 0, 360, 0, stepsPerRevolution);
Stepper myStepper(stepsPerRevolution, 8, 10, 9, 11); //lắp liên tiếp in1-4: 8, 9, 10, 11
IRrecv irrecv(6); 
decode_results results;
void setup() {
  myStepper.setSpeed(15);
  irrecv.enableIRIn(); // Bắt đầu nhận tín hiệu hồng ngoại
  Serial.begin(9600);
}

void rotateClockwise() {
  myStepper.step(step);
}

void rotateCounterclockwise() {
  myStepper.step(-step);
}

void loop() {
  if (irrecv.decode(&results))  // nếu nhận được tín hiệu
  {
    uint32_t IRcode = results.value;
    String keyBuf = translateIR(IRcode);
    if (keyBuf == "counter clockwise") {
      rotateCounterclockwise();
    } else if(keyBuf == "clockwise") {
      rotateClockwise();
    }
    irrecv.resume(); // nhận giá trị tiếp theo
    delay(1000);
  }
}
String translateIR(uint32_t code) {
  switch (code) {
    case 2885861797:
      return "counter clockwise"; // Xoay ngược chiều
    case 3960530492:
      return "clockwise"; // Xoay cùng chiều
    default:
      return "";
  }
}
