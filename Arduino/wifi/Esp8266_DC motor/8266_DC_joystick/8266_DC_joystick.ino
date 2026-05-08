#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>


const char* ssid = "Thanh Ha";
const char* password = "0905704270";


int motor1Pin1= 5; //d1
int motor1Pin2= 4; //d2
int e = 13;

const int x_axis_Pin = A0;
// const float y_axis_Pin = A0;
 int x_axis_value;
//  float y_axis_value = 0.0;

AsyncWebServer server(80);

const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      .dc_motor {
        font-size: 3rem;
      }
      .title {
        font-size: 2rem;
        vertical-align: middle;
        padding-bottom: 15px;
      }
      #digit_value {
        height: 50px;
        font-size: 50pt;
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
    <h2>ESP8266 control DC_motor</h2>

    <p class="dc_motor">
      <i class="fas fa-thermometer-half" style="color: #059e8a"></i>
      <span class="title">Enter the corner you want : </span>
      <input
        id="digit_value"
        style="height: 40px; width: 150px"
      />
    </p>
  </body>

  <script>
    var input = document.getElementById("digit_value");
    var xhttp = new XMLHttpRequest();

    input.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        sendData(input.value);
        input.value = "";
      }
    });

    function sendData(change_value) {
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          setTimeout(function () {
            xhttp.open("GET", "setvalue?dcmotor_value=0", true);
            xhttp.send();
          }, 3000);
        }
      };
      xhttp.open("GET", "setvalue?dcmotor_value=" + change_value, true);
      xhttp.send();
    }

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

  </script>
</html>

)rawliteral";


void setup()
{
  Serial.begin(9600);
  delay(1000);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
  Serial.println("IP Address: ");
  Serial.println(WiFi.localIP());


  pinMode (motor1Pin1, OUTPUT);
  pinMode (motor1Pin2, OUTPUT);
  pinMode(x_axis_Pin , INPUT);
  // pinMode(y_axis_Pin , INPUT);

   // DC motor

     server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(2000, "text/html", index_html);
  });

   server.on("/x_axis", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/plain", String(x_axis_value).c_str());
  });

  // server.on("/y_axis", HTTP_GET, [](AsyncWebServerRequest *request) {
  //   request->send_P(200, "text/plain", String(y_axis_value).c_str());
  // });

     server.on("/setvalue", HTTP_GET, [](AsyncWebServerRequest *request) {
    if (request->hasParam("dcmotor_value")) {
      String valueStr = request->getParam("dcmotor_value")->value();
      // int change_value = valueStr.toInt();
      // Serial.println(change_value);

            int motorValue = valueStr.toInt();

      if (motorValue == 0) {
        Serial.println("DC quay thuan");
        digitalWrite(motor1Pin1, HIGH);
        digitalWrite(motor1Pin2, LOW);
        analogWrite(e,255);
        delay(2000);       
       Serial.println("DC da dung");
      digitalWrite(motor1Pin1, LOW);
      digitalWrite(motor1Pin2, LOW);
      motorValue = -1;
      } else if (motorValue == 1) {
        Serial.println("DC quay nghich");
        digitalWrite(motor1Pin1, LOW);
        digitalWrite(motor1Pin2, HIGH);
          analogWrite(e,255);
        delay(2000);
        Serial.println("DC da dung");
      digitalWrite(motor1Pin1, LOW);
      digitalWrite(motor1Pin2, LOW);
      motorValue = -1;
      }
      request->send(2000, "text/plain", "DC position set to: " + valueStr);
    } else {
      request->send(4000, "text/plain", "No dcmotor_value parameter");
    }
  });
  server.begin();
}
void loop() {
  delay(2000);  // Delay between sensor readings

  int new_x_axis_value = analogRead(x_axis_Pin);
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












