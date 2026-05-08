const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
// kêt nối database
const dotenv = require("dotenv");
app.use(morgan("combined"));
dotenv.config();

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
// kết nối mogodb
//lets require/import the mongodb native drivers.
// Sử dụng cors middleware
app.use(cors());
const mongoose = require("mongoose");
mongoose
  .connect(process.env.URL_MONGDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Kết nối thành công");
  })
  .catch((error) => {
    console.error("Kết nối thất bại: ", error);
  });
const routerUser = require("./router/userRouter");
const routerLed = require("./router/ledRouter");
const routerBienso = require("./router/biensoRouter");
app.use("/login", routerUser);
app.use("/user", routerUser);
app.use("/led", routerLed);
app.use("/biensoxe", routerBienso);
app.use("/parkbooking", routerUser);

// register
app.use("/register", routerUser);
app.listen(4000);
