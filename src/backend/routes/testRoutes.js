const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "/tmp/" });
const testController = require("../controllers/testControllers");

router.post("/run-test", testController.runTests);
router.post("/runTestsCSV", upload.single("file"), testController.runTestsCSV);

module.exports = router;
