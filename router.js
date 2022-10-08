const express = require("express")
const {initializeDatabase, addAudioFile} = require("./controller")
const router = express.Router()

router.route("/").post(initializeDatabase);
router.route("/send").post(addAudioFile);

module.exports = router