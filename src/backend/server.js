// backend/server.js
const express = require("express");
const next = require("next");
const { setupWebDriver, runTest } = require("./selenium");
const { parseCSV, executeTests } = require("./csv");
const multer = require("multer");
const fs = require("fs");
const csv = require("fast-csv");

const upload = multer({ dest: "/tmp/" });
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.post("/api/runTestsCSV", upload.single("file"), async (req, res) => {
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
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3001, (err) => {
    if (err) throw err;
    console.log("> Servidor listo en http://localhost:3001");
  });
});
