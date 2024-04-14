const express = require("express");
const next = require("next");
const { setupWebDriver, runTest } = require("./selenium");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.post("/api/run-test", async (req, res) => {
    try {
      const driver = await setupWebDriver();
      await runTest(driver);
      res.status(200).send("Prueba completada con éxito.");
    } catch (error) {
      console.error("Error al ejecutar la prueba:", error);
      res.status(500).send("Error al ejecutar la prueba.");
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
