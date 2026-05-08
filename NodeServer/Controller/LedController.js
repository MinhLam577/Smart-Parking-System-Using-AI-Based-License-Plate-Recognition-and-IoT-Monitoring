const { Led } = require("../models/UserModel");

class LedController {
  // [Get] led/
  getLed(req, res, next) {
    Led.find({})
      .then((data) => {
        res.json(data);
      })
      .catch(next);
  }
  //  [Post] led/
  createLed(req, res) {
    // Assuming you have a model named Led
    const createLed = new Led(req.body);

    createLed
      .save()
      .then((led) => {
        res.json({
          message: "Tạo LED thành công",
          data: led,
        });
      })
      .catch((err) => {
        console.error("Error creating LED:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  }
  // [delete] led/:id
  deleteLed(req, res) {
    console.log(req.params._id)
    Led.deleteOne({_id: req.params._id})
      .then((data) => {
        console.log(data)
       if (data.deletedCount === 0) {
          return res.status(404).json({ message: "LED không tồn tại" });
        }
        // đọc document bảo  data.deletedCount == 1 là đã xóa 
        //the number of documents deleted
        res.json({ message: "Xóa LED thành công" });
      })
      .catch((err) => {
        console.error("Error deleting LED:", err);
        res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
      });
  }

  // update status 
  //[PUT] /update/:id
  updateLed(req, res) {
    Led.updateOne({ _id: req.params._id }, req.body)
        .then(() => {
            // Retrieve the updated LED document
            return Led.findById(req.params._id);
        })
        .then(updatedLed => {
            if (!updatedLed) {
                return res.status(404).json({ message: "LED không tồn tại" });
            }
            res.json({ message: "Cập nhật LED thành công", data: updatedLed });
        })
        .catch(err => {
            console.error("Error updating LED:", err);
            res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
        });
  // 
    }
}
module.exports = new LedController();
