#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <Servo.h>

const char* ssid = "Golden Time Coffee";
const char* password = "147trannguyendan";

#define ServoPort D4
#define lineSensor A0

AsyncWebServer server(80);
Servo myservo;
String currentColor = "Dark";

const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ESP8266 Servo Control</title>
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
        #corner_value {
            height: 40px;
            width: 150px;
        }
        .doline {
            font-size: 3rem;
        }
        .l390 {
            font-size: 3rem;
            vertical-align: middle;
            padding-bottom: 15px;
        }
    </style>
</head>
<body>
    <h2>ESP8266 control Servo_motor</h2>
    <p class="servo_motor">
        <span class="title">Enter the corner you want: </span>
        <input id="corner_value" placeholder="Enter the corner here" style="height: 40px; width: 150px" />
    </p>
    <p>Value of corner: <span id="demo"></span></p>
    
    <h2>ESP8266 identify light line and dark line</h2>
    <p class="doline">
        <span class="l390">Current color: </span>
        <span id="currentcolor">%color%</span>
    </p>

    <script>
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
                }
            };
            xhttp.open("GET", "setcorner?servomotor_corner=" + corner, true);
            xhttp.send();
        }

        setInterval(function () {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("currentcolor").innerHTML = this.responseText;
                }
            };
            xhttp.open("GET", "/currentcolor", true);
            xhttp.send();
        }, 1000);
    </script>
</body>
</html>
)rawliteral";

void setup() {
    Serial.begin(9600);
    delay(1000);
    server.begin();
    myservo.attach(ServoPort,600,2300); // Servo signal pin

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }

    Serial.println("Connected to WiFi");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());

    server.on("/setcorner", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (request->hasParam("servomotor_corner")) {
            String cornerStr = request->getParam("servomotor_corner")->value();
            Serial.println("Received angle from web server: ");
            int corner = cornerStr.toInt();
            Serial.println(corner);

            myservo.write(corner);
            request->send(200, "text/plain", "Servo position set to: " + cornerStr);
        } else {
            request->send(400, "text/plain", "No servomotor_corner parameter");
        }
    });

    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send_P(200, "text/html", index_html);
    });

    server.on("/currentcolor", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send_P(200, "text/plain", currentColor.c_str());
    });
}

void loop() {
    delay(2000); // Delay between sensor readings

    int new_lightvalue = analogRead(lineSensor);
    if (isnan(new_lightvalue)) {
        Serial.println("Failed to read from Light sensor!");
    } else {
        if (new_lightvalue < 300) {
            currentColor = "Light";
            Serial.println(currentColor);
        } else {
            currentColor = "Dark";
            Serial.println(currentColor);
        }
    }
}
