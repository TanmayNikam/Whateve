const express = require("express");
const {
  initializeDatabase,
  addAudioFile,
  findAudioFile,
} = require("./controller");
const router = express.Router();

router.route("/").post(initializeDatabase);
router.route("/send").post(addAudioFile);
router.route("/lookup").post(findAudioFile);

module.exports = router;
