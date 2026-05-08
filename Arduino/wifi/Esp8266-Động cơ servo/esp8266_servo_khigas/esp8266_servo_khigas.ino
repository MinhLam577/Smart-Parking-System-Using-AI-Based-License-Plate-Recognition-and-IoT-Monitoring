#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <Adafruit_Sensor.h>
#include <MQ2.h>
#include <Servo.h>


const char* ssid = "Golden Time Coffee";
const char* password = "147trannguyendan";

#define MQ2pin A0     // Digital pin connected to the DHT sensor
#define Threshold 400
#define ServoPort D4 

float gasvalue = 0.0;

AsyncWebServer server(80);
Servo myservo;

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
      .khigas {
        font-size: 3rem;
      }
      .mq2 {
        font-size: 3rem;
        vertical-align: middle;
        padding-bottom: 15px;
      }
    </style>
  </head>
  <body>
    <h2>ESP8266 take data from MQ2</h2>

    <p class="khigas">
      <i class="fas fa-thermometer-half" style="color: #059e8a"></i>
      <span class="mq2"> Number </span>
      <span id="giatrigas">%Value%</span>
    </p>
    <h2>ESP8266 control Servo_motor</h2>

    <p class="servo_motor">
      <i class="fas fa-thermometer-half" style="color: #059e8a"></i>
      <span class="title">Enter the corner you want : </span>
      <input
        id="corner_value"
        placeholder=" Enter the corner in here"
        style="height: 40px; width: 150px"
      />
    </p>
    <p>Value of corner : <span id="demo"></span></p>
  </body>

  <script>
    setInterval(function () {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("giatrigas").innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", "/giatrigas", true);
      xhttp.send();
    }, 1000);

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
            xhttp.open("GET", "setcorner?servomotor_corner=0", true);
            xhttp.send();
          }, 3000);
        }
      };
      xhttp.open("GET", "setcorner?servomotor_corner=" + corner, true);
      xhttp.send();
    }
  </script>
</html>
)rawliteral";


void setup() {
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

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/html", index_html);
  });

  server.on("/giatrigas", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/plain", String(gasvalue).c_str());
  });

    server.on("/setcorner", HTTP_GET, [](AsyncWebServerRequest *request) {
    if (request->hasParam("servomotor_corner")) {
      String cornerStr = request->getParam("servomotor_corner")->value();
      Serial.println("goc nhan tu webserver : ");
      int corner = cornerStr.toInt();
      Serial.print(corner);

      myservo.write(corner);
      request->send(4000, "text/plain", "Servo position set to: " + cornerStr);
    } else {
      request->send(4000, "text/plain", "No servomotor_corner parameter");
    }
  });

  server.begin();

 myservo.attach(D4,600, 2300); // Servo signal pin
}

void loop() {
  delay(2000);  // Delay between sensor readings

  float newGasvalue = analogRead(MQ2pin);
  if (isnan(newGasvalue)) {
    Serial.println("Failed to read from MQ-2 sensor!");
  } else {
    gasvalue = newGasvalue;
    Serial.print("Gas Value: ");
    Serial.println(gasvalue);
  }
}
