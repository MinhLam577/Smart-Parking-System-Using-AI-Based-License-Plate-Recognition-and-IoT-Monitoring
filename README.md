# Smart Parking System using Deep Learning & IoT

Automatic parking management system using License Plate Recognition, RFID and IoT devices.

---

## Demo Video

[![Watch Demo](https://img.youtube.com/vi/vKza0yyq67U/maxresdefault.jpg)](https://youtube.com/shorts/vKza0yyq67U?feature=share)

---

## Overview

Smart Parking System is an IoT and Deep Learning based parking management system developed using Python, ESP8266, Node.js Express, ReactJS and MongoDB.

The system combines RFID authentication and license plate recognition to automatically control parking barriers. Camera data is processed using Object Detection and CNN Classification models to detect license plates and recognize characters in real time.

In addition, the system integrates ultrasonic sensors, infrared sensors, LCD displays and servo motors to monitor parking slots, automatically control barriers and display parking availability status in real time.

---

## System Architecture

### Overall System Architecture
![System Architecture](setup_images/system_architecture.png)

### Hardware Circuit Diagram
![Circuit Diagram](setup_images/circuit_diagram.png)

---

## Features

- License plate detection using Deep Learning
- Character recognition using CNN
- RFID authentication system
- Automatic barrier control
- Real-time parking slot monitoring
- LCD parking slot display
- Ultrasonic & infrared sensor integration
- Temperature, humidity and gas monitoring
- Real-time communication with ESP8266
- Web-based parking management dashboard

---

## System Workflow

1. Vehicle stops at the entrance barrier
2. User scans RFID card
3. Camera captures vehicle license plate
4. AI model detects and recognizes plate number
5. System validates RFID and license plate data
6. Barrier opens automatically
7. Ultrasonic sensors detect vehicle movement
8. LCD updates parking slot status in real time
9. Infrared sensors detect occupied parking slots
10. Barrier automatically closes after vehicle passes

---

## License Plate Recognition Pipeline

### Detection Pipeline
![Detection Pipeline](setup_images/license_plate_pipeline.png)
---

## Image Rotation Correction

Detected license plates are automatically corrected using contour analysis and image processing techniques before character extraction.

![Rotation Correction](setup_images/rotation_correction.png)

---

## Character Segmentation

The detected license plate is converted into binary images and segmented into individual characters using Connected Component Analysis (CCA) and contour filtering.

![Character Segmentation](setup_images/character_segmentation.png)

---

## CNN Character Classification Model

CNN architecture used for license plate character classification.
<p align="center">
  <img src="setup_images/cnn_model.png" width="600"/>
</p>

---

## Web Dashboard

### Main Dashboard

<p align="center">
  <img src="setup_images/dashboard.png" width="320"/>
</p>

### Smart LED Control

<p align="center">
  <img src="setup_images/led_control.png" width="320"/>
</p>

### Temperature & Gas Monitoring

<p align="center">
  <img src="setup_images/temperature_gas.png" width="700"/>
</p>

### RFID & License Plate Management

<p align="center">
  <img src="setup_images/rfid_management.png" width="850"/>
</p>

---

## Technologies
- Frontend: ReactJS
- Backend: Python
- Database: MongoDB
- AI/Computer Vision: TensorFlow, OpenCV, SSD MobileNet V2 FPNLite, CNN
- Hardware/IoT: ESP8266, Arduino UNO, RFID RC522, HC-SR04, Infrared Sensor, LCD1602, Servo Motor

### Contributors
- Lâm Nhật Minh
- Trần Ngọc Thanh Long
- Ngô Đình Phước
- Nguyễn Nhật Minh