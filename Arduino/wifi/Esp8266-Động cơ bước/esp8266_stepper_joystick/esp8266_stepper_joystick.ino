#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <Stepper.h>

#define IN1 5
#define IN2 4
#define IN3 0
#define IN4 2

const float x_axis_Pin = A0;
// const float y_axis_Pin = A0;

const char* ssid = "ANGEL COFFEE_5G";
const char* password = "camonquykhach";

const int stepsPerRevolution = 2048; // 2048 bước để 1 vòng đối với động cơ bước 28BYJ 48 nên 1 bước quay là 2048/360 độ  ​
Stepper myStepper = Stepper(stepsPerRevolution, IN1, IN3, IN2, IN4); 

 float x_axis_value = 0.0;
//  float y_axis_value = 0.0;

AsyncWebServer server(80);

// code webserver
const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=, initial-scale=1.0" />
    <title>Document</title>

    <style>
      html {
        font-family: Arial;
        display: inline-block;
        margin: 0px auto;
        text-align: center;
      }
      h2 {
        font-size: 3rem;
      }
      .joystick {
        font-size: 3rem;
      }
      .ultrasonic {
        font-size: 3rem;
        vertical-align: middle;
        padding-bottom: 15px;
      }
    </style>
  </head>
  <body>
    <h2>ESP8266 take data from Joystick</h2>

    <p class="joystick">
      <i class="fas fa-thermometer-half" style="color: #059e8a"></i>
      <span class="ultrasonic">Position : </span>
      <span id="x-axis">%X-axis%</span>
      // ,
      // <span id="y-axis">%Y-axis%</span>
    </p>

      <body>
    <h2>ESP8266 control Step_motor</h2>

    <p class="step_motor">
      <i class="fas fa-thermometer-half" style="color: #059e8a"></i>
      <span class="title">Enter the corner you want : </span>
      <input
        id="corner_value"
        placeholder=" Enter the corner in here"
        style="height: 40px; width: 150px"
        onkeypress="enterPress(event)"
      />
    </p>
    <!-- <p>Value of corner : <span id="demo"></span></p> -->
  </body>

  <script>
    setInterval(function () {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("x-axis").innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", "/x_axis", true);
      xhttp.send();
    }, 3000);

    setInterval(function () {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("y-axis").innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", "/y_axis", true);
      xhttp.send();
    }, 3000);

      var input = document.getElementById("corner_value");
      var xhttp = new XMLHttpRequest();

      input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          sendData(input.value);
          input.value = "";
        }
      });

      function sendData(corner) {
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            setTimeout(function () {
              xhttp.open("GET", "setcorner?stepmotor_corner=0", true);
              xhttp.send();
            }, 3000);
          }
        };
        xhttp.open("GET", "setcorner?stepmotor_corner=" + corner, true);
        xhttp.send();
      }
  </script>
</html>

)rawliteral";


void setup() {

  pinMode(x_axis_Pin , INPUT);
  // pinMode(y_axis_Pin , INPUT);

  Serial.begin(9600);
  delay(1000);
  // Initialize Joystick Library
  server.begin();

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
  Serial.println("IP Address: ");
  Serial.println(WiFi.localIP());

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/html", index_html);
  });

  server.on("/x_axis", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/plain", String(x_axis_value).c_str());
  });

  // server.on("/y_axis", HTTP_GET, [](AsyncWebServerRequest *request) {
  //   request->send_P(200, "text/plain", String(y_axis_value).c_str());
  // });

	// pinMode(pinToButtonMap, INPUT_PULLUP);

  server.on("/setcorner", HTTP_GET, [](AsyncWebServerRequest *request) {
    if (request->hasParam("stepmotor_corner")) {
      String cornerStr = request->getParam("stepmotor_corner")->value();
      Serial.println("goc nhan tu webserver : ");
      int corner = cornerStr.toInt();
      Serial.print(corner);
      int stepper = (corner*2048)/360;
      Serial.println("so buoc la : ");
      Serial.print(stepper);
      myStepper.step(stepper);
      request->send(4000, "text/plain", "Servo position set to: " + cornerStr);
    } else {
      request->send(4000, "text/plain", "No stepmotor_corner parameter");
    }
  });
myStepper.setSpeed(15);
  server.begin();

}

void loop() {
  delay(2000);  // Delay between sensor readings

  float new_x_axis_value = analogRead(x_axis_Pin);
  // float new_y_axis_value = analogRead(y_axis_Pin);

  // int new_y_axis = analogRead(y_axis);
  if (isnan(new_x_axis_value) ) {   // && isnan(new_y_axis_value)
    Serial.println("Failed to read from joystick!");
  } else {
      x_axis_value = new_x_axis_value;
      // y_axis_value = new_y_axis_value;
      Serial.print("Value of x_axis is :");
      Serial.println(x_axis_value);
      // Serial.print("Value of y_axis is :");
      // Serial.println(y_axis_value);
    }
}