# Smart Parking System

## Demo Video
[Watch Demo Video](https://youtube.com/shorts/vKza0yyq67U?feature=share)

---

## Overview

Hệ thống bãi đỗ xe thông minh ứng dụng Deep Learning và IoT, sử dụng Python, ESP8266, Node.js Express, MongoDB và ReactJS để quản lý và giám sát bãi xe theo thời gian thực.

Hệ thống tích hợp nhận diện biển số xe bằng camera kết hợp các mô hình Object Detection và Classification để trích xuất ký tự biển số. Quy trình xác thực sử dụng đồng thời RFID và biển số xe nhằm đảm bảo tính bảo mật trước khi điều khiển barrier tự động.

Ngoài ra, hệ thống còn tích hợp cảm biến siêu âm, hồng ngoại, LCD và motor điều khiển để tự động đóng/mở barrier, theo dõi trạng thái chỗ đỗ và hiển thị số lượng vị trí còn trống theo thời gian thực. ESP8266 đóng vai trò giao tiếp giữa các vi điều khiển và hệ thống backend thông qua API.

---

## Technologies

- Python
- Deep Learning
- ESP8266
- Node.js Express
- ReactJS
- MongoDB
- RFID
- Ultrasonic Sensor
- Infrared Sensor
- LCD Display

---

## Model Training Result

### Confusion Matrix
![Confusion Matrix](setup_images/confusion_matrix.png)

### Precision Detail
![Precision Detail](setup_images/precision_detail.png)

### Recall Detail
![Recall Detail](setup_images/recall_detail.png)

### Precision - Recall - F1 Score
![PRF1](setup_images/precision_recall_f1_score.png)

### Precision - Recall - F1 Score Accuracy IOU50
![IOU50](setup_images/precision_recall_f1_score_accuracyIOU_50.png)

### Train Loss & Eval Loss
![Loss](setup_images/train_loss_eval_loss.png)

---

## Features

- License plate recognition using Deep Learning
- RFID authentication
- Automatic barrier control
- Real-time parking slot monitoring
- LCD parking status display
- IoT communication with ESP8266
- Real-time management dashboard