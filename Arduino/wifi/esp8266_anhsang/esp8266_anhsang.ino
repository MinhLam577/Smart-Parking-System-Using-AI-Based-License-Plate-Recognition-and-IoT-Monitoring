#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <Adafruit_Sensor.h>


const char* ssid = "Golden Time Coffee";
const char* password = "147trannguyendan";

#define Lightpin 5     // Digital pin connected to the DHT sensor
String currentLight  = "Dark";


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
      .light_sensor {
        font-size: 3rem;
      }
      .title {
        font-size: 3rem;
        vertical-align: middle;
        padding-bottom: 15px;
      }
    </style>
  </head>
  <body>
    <h2>ESP8266 identify light line and dark line</h2>

    <p class="light_sensor">
      <i class="fas fa-thermometer-half" style="color: #059e8a"></i>
      <span class="title">Hiện tại là buổi _ </span>
      <span id="light_Value">%light or dark%</span>
    </p>
  </body>

  <script>
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

  server.on("/light_Value", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/plain", String(currentLight).c_str());
  });

  server.begin();

}

void loop() {
  delay(2000);  // Delay between sensor readings

  float new_lightvalue = digitalRead(Lightpin);
  if (isnan(new_lightvalue)) {
    Serial.println("Failed to read from Light sensor!");
  } else {
        if(new_lightvalue = 0){
          currentLight = "Dark";
          Serial.println(currentLight);
        } else {
          currentLight = "Light";
          Serial.println(currentLight);
        }
  }
}