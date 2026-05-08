const { Schema, default: mongoose } = require("mongoose");

const user = new Schema({
  gmail: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "user",
    required: true,
  }
});
const User = mongoose.model("user", user);
const led = new mongoose.Schema({
    name : String,
    status : Boolean,
    Pin: String
})
const Led = mongoose.model("led",led)
const biensoxe = new mongoose.Schema({
    name : String,
    mabien : String
})
const BienSoXe= mongoose.model("biensoxe",biensoxe)

module.exports = { User,Led,BienSoXe};
