const { setupWebDriver, runTest } = require("../services/selenium");
const { parseCSV, executeTests } = require("../services/csv");

const runTests = async (req, res) => {
  try {
    console.log("Received body:", JSON.stringify(req.body, null, 2));
    const driver = await setupWebDriver();
    console.log("WebDriver setup complete.");

    const results = await runTest(driver, req.body.instructions, req.body.url);
    console.log("Test results:", results);
    res.status(200).json({ results }); 
  } catch (error) {
    console.error("Error during test execution:", error);
    // Send back the error message only in development mode for debugging
    if (process.env.NODE_ENV === 'development') {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).send("Error during test execution.");
    }
  }
};


const runTestsCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = req.file.path;

  try {
    const tests = await parseCSV(filePath);
    const driver = await setupWebDriver();
    const testResults = await executeTests(driver, tests);

    await driver.quit();
    res
      .status(200)
      .json({ message: "Tests completed and results saved.", testResults });
    console.log("Pruebas completadas y resultados .");
  } catch (error) {
    console.error("Error processing CSV file:", error);
    res.status(500).send("Error processing tests.");
  }
};

module.exports = {
  runTests,
  runTestsCSV,
};
