#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <Adafruit_Sensor.h>


const char* ssid = "Cafe Thien Anh";
const char* password = "999999999";

#define Lightpin A0     // Digital pin connected to the DHT sensor
String currentLight  = "Dark";

int motor1Pin1= 5; //d1
int motor1Pin2= 4; //d2


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

    <h2>ESP8266 identify light line and dark line</h2>

    <p class="light_sensor">
      <i class="fas fa-thermometer-half" style="color: #059e8a"></i>
      <span class="title">Hiện tại là buổi _ </span>
      <span id="light_Value">%light or dark%</span>
    </p>
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
          document.getElementById("light_Value").innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", "/light_Value", true);
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

   // DC motor

     server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(2000, "text/html", index_html);
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
        delay(2000);       
       Serial.println("DC da dung");
      digitalWrite(motor1Pin1, LOW);
      digitalWrite(motor1Pin2, LOW);
      motorValue = -1;
      } else if (motorValue == 1) {
        Serial.println("DC quay nghich");
        digitalWrite(motor1Pin1, LOW);
        digitalWrite(motor1Pin2, HIGH);
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

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
  request->send_P(200, "text/html", index_html);
  });

  server.on("/light_Value", HTTP_GET, [](AsyncWebServerRequest *request) {
  request->send_P(200, "text/plain", String(currentLight).c_str());
  });
}
void loop() {
  delay(2000);  // Delay between sensor readings

  float new_lightvalue = analogRead(Lightpin);
  if (isnan(new_lightvalue)) {
    Serial.println("Failed to read from Light sensor!");
  } else {
        if(new_lightvalue < 300){
          currentLight = "Dark";
          Serial.println(currentLight);
        } else {
          currentLight = "Light";
          Serial.println(currentLight);
        }
  }
}