#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>

#define TRIG_PIN 12
#define ECHO_PIN 14
#define TIME_OUT 5000

const char* ssid = "Thanh Ha";
const char* password = "0905704270";


int motor1Pin1= 5; //d1
int motor1Pin2= 4; //d2
int e = 13;
long distance = 0;

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
    <h2>ESP8266 control DC_motor</h2>

    <p class="dc_motor">
      <i class="fas fa-thermometer-half" style="color: #059e8a"></i>
      <span class="title">Enter the corner you want : </span>
      <input
        id="digit_value"
        style="height: 40px; width: 150px"
      />
    </p>
    <h2>ESP8266 take data from Ultrasonic</h2>

    <p class="hc04">
      <i class="fas fa-thermometer-half" style="color: #059e8a"></i>
      <span class="ultrasonic">Distance : </span>
      <span id="distance">%Distance%</span>
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
          document.getElementById("distance").innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", "/distance", true);
      xhttp.send();
    }, 1000);

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
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

   // DC motor

     server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(2000, "text/html", index_html);
  });
server.on("/distance", HTTP_GET, [](AsyncWebServerRequest *request) {
    float distance = GetDistance();
    request->send_P(200, "text/plain", String(distance).c_str());
  });
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







