#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <Servo.h>

const char* ssid = "Golden Time Coffee";
const char* password = "147trannguyendan";

#define DHTPIN 5     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11     // DHT 11
#define ServoPort D4  


DHT dht(DHTPIN, DHTTYPE);
float temperature = 0.0;
float humidity = 0.0;

AsyncWebServer server(80);
Servo myservo;


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
      .servo_motor {
        font-size: 3rem;
      }
      .title {
        font-size: 2rem;
        vertical-align: middle;
        padding-bottom: 15px;
      }
      #corner {
        height: 50px;
        font-size: 50pt;
              .dht {
        font-size: 3rem;
      }
      .units {
        font-size: 1.2rem;
      }
      .dht-labels {
        font-size: 1.5rem;
        vertical-align: middle;
        padding-bottom: 15px;
      }

      }
    </style>
  </head>

  <body>

    <!--DHT11 sensor-->

    <h2 class="thac1">ESP8266 Receive Value From DHT Server</h2>
    <p class="dht">
      <i class="fas fa-thermometer-half" style="color: #059e8a"></i>
      <span class="dht-labels">Temperature</span>
      <span id="temperature">%TEMPERATURE%</span>
      <sup class="units">&deg;C</sup>
    </p>
    <p class="dht">
      <i class="fas fa-tint" style="color: #00add6"></i>
      <span class="dht-labels">Humidity</span>
      <span id="humidity">%HUMIDITY%</span>
      <sup class="units">%</sup>
    </p>

    <!-- servo -->
    
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

     // DHT11 sensor

    setInterval(function () {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("temperature").innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", "/temperature", true);
      xhttp.send();
    }, 10000);

    setInterval(function () {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("humidity").innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", "/humidity", true);
      xhttp.send();
    }, 10000);
 
    // servo

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

  server.on("/temperature", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/plain", String(temperature).c_str());
  });

  server.on("/humidity", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/plain", String(humidity).c_str());
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

  dht.begin();
  myservo.attach(D4,600, 2300); // Servo signal pin
}

void loop() {
  delay(2000);  // Delay between sensor readings

  float newTemperature = dht.readTemperature();
  float newHumidity = dht.readHumidity();

  if (isnan(newTemperature) || isnan(newHumidity)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    temperature = newTemperature;
    humidity = newHumidity;
    Serial.print("Temperature: ");
    Serial.println(temperature);
    Serial.print("Humidity: ");
    Serial.println(humidity);
  }
}
