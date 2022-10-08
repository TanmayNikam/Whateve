const express = require("express")
const {initializeDatabase} = require("./controller")
const router = express.Router()

router.route("/").get((initializeDatabase));

module.exports = router