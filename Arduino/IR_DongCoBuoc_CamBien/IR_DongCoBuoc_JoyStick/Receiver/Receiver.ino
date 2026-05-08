#include <Stepper.h>
#include <IRremote.h>

const int stepsPerRevolution = 2048; // Số bước mỗi vòng quay
const int step = map(90, 0, 360, 0, stepsPerRevolution);
Stepper myStepper(stepsPerRevolution, 8, 10, 9, 11); // Chân điều khiển động cơ: 8, 9, 10, 11
IRrecv irrecv(6); 
decode_results results;

int get_step(int angle){
  return map(angle, 0, 360, 0, stepsPerRevolution);
}

void setup() {
  myStepper.setSpeed(15); // Tăng tốc độ động cơ lên 30 RPM
  irrecv.enableIRIn(); // Bắt đầu nhận tín hiệu hồng ngoại
  Serial.begin(9600);
}

void rotate(int angle){
  myStepper.step(get_step(angle));
}

void loop() {
  if (irrecv.decode(&results))  // nếu nhận được tín hiệu
  {
    uint32_t IRcode = results.value;
    String keyBuf = translateIR(IRcode);
    Serial.print("Mã phím: ");
    Serial.println(keyBuf);

    if (keyBuf == "xoay ngược chiều 90") {
      rotate(-90);
    } else if(keyBuf == "xoay cùng chiều 90") {
      rotate(90);
    } else if(keyBuf == "xoay ngược chiều 180"){
      rotate(-180);
    } else if(keyBuf == "xoay cùng chiều 180"){
      rotate(180);
    }
    irrecv.resume(); // nhận giá trị tiếp theo
    delay(500); // Giảm thời gian delay để tăng tốc độ xử lý
  }
}

String translateIR(uint32_t code) {
  switch (code) {
    case 2885861797:
      return "xoay ngược chiều 90"; // Xoay ngược chiều
    case 3960530492:
      return "xoay cùng chiều 90"; // Xoay cùng chiều
    case 1360385064:
      return "xoay ngược chiều 180";
    case 63955496:
      return "xoay cùng chiều 180";
    default:
      return "";
  }
}
