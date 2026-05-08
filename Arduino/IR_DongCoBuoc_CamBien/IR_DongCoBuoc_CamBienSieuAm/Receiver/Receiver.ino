#include <Stepper.h>
#include <IRremote.h>

const int stepsPerRevolution = 2048; // Số bước mỗi vòng quay
const int step = map(90, 0, 360, 0, stepsPerRevolution);
Stepper myStepper(stepsPerRevolution, 8, 10, 9, 11); // Lắp liên tiếp in1-4: 8, 9, 10, 11
IRrecv irrecv(6); 
decode_results results;

void setup() {
  myStepper.setSpeed(15); // Thiết lập tốc độ động cơ
  irrecv.enableIRIn(); // Bắt đầu nhận tín hiệu hồng ngoại
  Serial.begin(9600);
}

void quayCungChieu() {
  myStepper.step(step);
}

void quayNguocChieu() {
  myStepper.step(-step);
}

void loop() {
  if (irrecv.decode(&results)) { // Nếu nhận được tín hiệu
    uint32_t maHongNgoai = results.value;
    String chuoiPhim = dichMaHongNgoai(maHongNgoai);
    Serial.print("Quay: ");
    Serial.println(chuoiPhim);
    if (chuoiPhim == "quay nguoc chieu") {
      quayNguocChieu();
    } else if(chuoiPhim == "quay cung chieu") {
      quayCungChieu();
    }
    irrecv.resume(); // Nhận giá trị tiếp theo
    delay(1000); // Đợi 1 giây trước khi nhận lệnh tiếp theo
  }
}

String dichMaHongNgoai(uint32_t ma) {
  switch (ma) {
    case 2885861797:
      return "quay nguoc chieu"; // Xoay ngược chiều
    case 3960530492:
      return "quay cung chieu"; // Xoay cùng chiều
    default:
      return "";
  }
}
