const { BienSoXe } = require("../models/UserModel");
class BienSo {
  // [Get]/biensoxe/
  getBienSo(req, res) {
    BienSoXe.find({})
      .then((data) => {
        if (data) {
          res.status(200).json({
            message: "Lấy thành công",
            data: data,
          });
        }
      })
      .catch((error) => {
        res.status(500).json("Lỗi");
      });
  }
  //
  createBienSo(req, res) {
    const createBienSo = new BienSoXe(req.body);
    createBienSo
      .save()
      .then((data) => {
        res.json({
          message: "Tạo Biển Số Xe thành công",
          data: data,
        });
      })
      .catch((err) => {
        console.error("Error creating BienSoxe:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  }
  //[delete]biensoxe/:id
  deleteBienSo(req, res) {
    BienSoXe.deleteOne({ _id: req.params._id })
      .then((data) => {
        if (data.deletedCount === 0) {
          return res.status(404).json({ message: "Bien So không tồn tại" });
        }
        // đọc document bảo  data.deletedCount == 1 là đã xóa
        //the number of documents deleted
        res.json({ message: "Xóa Biển Số thành công" });
      })
      .catch((err) => {
        console.error("Error deleting Biển Số:", err);
        res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
      });
  }
  //[Put]/update/:_id
  updateBiensoxe(req, res) {
    BienSoXe.updateOne({ _id: req.params._id }, req.body)
      .then(() => {
        return BienSoXe.findById(req.params._id);
      })

      .then((biensoxeUpdated) => {
        if (biensoxeUpdated) {
          return res.status(200).json({
            message: "Cập nhật Biển Số Thành Công",
          });
        }
        res.json({
          message: "Cập nhật Biển Số không thành công",
          data: biensoxeUpdated,
        });
      })
      .catch((err) => {
        console.error("Error updating Biển Số:", err);
        res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
      });
  }
}
module.exports = new BienSo();
