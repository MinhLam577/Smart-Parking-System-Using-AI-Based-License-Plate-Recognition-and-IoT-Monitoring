#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>

const float x_axis_Pin = A0;
// const float y_axis_Pin = A0;


const char* ssid = "Tien";             // Angel Coffee FPT T2 : camonquykhach
const char* password = "0912999777";


 float x_axis_value = 0.0;
//  float y_axis_value = 0.0;

AsyncWebServer server(80);

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