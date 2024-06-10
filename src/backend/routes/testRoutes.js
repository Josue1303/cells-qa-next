const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "/tmp/" });
const testController = require("../controllers/testControllers");

router.post("/run-test", testController.runTests);
router.post("/runTestsCSV", upload.single("file"), testController.runTestsCSV);
router.post('/createTest', testController.createTest);
router.get('/test-metrics/:directoryId', testController.calculateAllTestMetrics);
router.get('/export-metrics/:directoryId', testController.exportTestMetricsToCSV);
router.get('/individual-metrics/:testId', testController.exportIndividualTestMetricsToCSV);
router.get('/get-all-tests/:testId', testController.getInstructionsByTestId);
router.delete('/delete-test/:testId', testController.deleteTest);

module.exports = router;
