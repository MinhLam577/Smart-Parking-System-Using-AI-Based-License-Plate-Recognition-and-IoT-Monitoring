const { User } = require("../models/UserModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// tạo token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
class userController {
  // [post]/register

  async register(req, res) {
    const { gmail, password } = req.body;
    const existingUser = await User.findOne({ gmail: gmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    try {
      bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
          gmail,
          password: hash,
        }).then((user) => {
          // create token
          const token = createToken(user._id);
          res.status(200).json({
            message: "User successfully created",
            user,
            token,
          });
        });
      });
    } catch (err) {
      res.status(401).json({
        message: "User not successful created",
        error: error.mesage,
      });
    }
  }

  login(req, res) {
    const { gmail, password } = req.body;
    // Search for user in the database
    User.findOne({ gmail })
      .exec()
      .then((user) => {
        if (!user) {
          // User not found
          return res
            .status(404)
            .json({ message: "Login not successful", error: "User not found" });
        }
        // User found, login successful
        else {
          bcrypt.compare(password, user.password).then(function (result) {
            if (result) {
              const token = createToken(result._id);
              return res.status(200).json({
                message: "Đăng Nhập successful",
                user,
                token,
              });
            }
            else{
              return res.status(400).json({ message: "Login not succesful" });
            }
          });
        }
      })
      .catch((err) => {
        console.error("Error searching for user:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  }

  //
  show(req, res) {
    res.send("Thành công ");
  }

  //
  get(req, res) {}

  create(req, res) {}

  delete(req, res) {}

  edit(req, res) {}

  update(req, res) {}
}
module.exports = new userController();
