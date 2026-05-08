const express = require("express");
const router = express.Router();
const ledController = require("../Controller/LedController");
router.delete("/:_id", ledController.deleteLed);
router.get("/", ledController.getLed);
router.post("/", ledController.createLed);
router.put("/update/:_id", ledController.updateLed);
module.exports = router;
