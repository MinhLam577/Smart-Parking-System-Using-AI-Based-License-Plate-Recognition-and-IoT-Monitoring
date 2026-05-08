#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <Adafruit_Sensor.h>
#include <Stepper.h>

const char* ssid = "ANGEL COFFEE_5G";
const char* password = "camonquykhach";

#define TRIG_PIN 12
#define ECHO_PIN 14
#define TIME_OUT 5000

#define IN1 5
#define IN2 4
#define IN3 0
#define IN4 2

const int stepsPerRevolution = 2048; // 2048 bước để 1 vòng đối với động cơ bước 28BYJ 48 nên 1 bước quay là 2048/360 độ  
Stepper myStepper = Stepper(stepsPerRevolution, IN1, IN3, IN2, IN4); 

long distance = 0;

AsyncWebServer server(80);

// code webserver
const char index_html[] PROGMEM = R"rawliteral(
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
      .hc04 {
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
    <h2>ESP8266 take data from Ultrasonic</h2>

    <p class="hc04">
      <i class="fas fa-thermometer-half" style="color: #059e8a"></i>
      <span class="ultrasonic">Distance : </span>
      <span id="distance">%Distance%</span>
    </p>

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
          document.getElementById("distance").innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", "/distance", true);
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
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

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

  server.on("/distance", HTTP_GET, [](AsyncWebServerRequest *request) {
    float distance = GetDistance();
    request->send_P(200, "text/plain", String(distance).c_str());
  });

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

float GetDistance() {
  long duration, distanceCm;
   
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  duration = pulseIn(ECHO_PIN, HIGH, TIME_OUT);
  // convert to distance
  distanceCm = duration / 29.1 / 2;
  
  return distanceCm;
}

void loop() {
    long newDistance = GetDistance();
    Serial.print("Distance to nearest obstacle (cm): ");
    Serial.println(newDistance);

      if (isnan(newDistance)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    distance = newDistance;
    Serial.print("Distance: ");
    Serial.println(distance);
  }
}
