// backend/server.js
const express = require("express");
const next = require("next");
const { setupWebDriver, runTest } = require("./selenium");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.post("/api/run-test", async (req, res) => {
    try {
      console.log("Este es el body:", JSON.stringify(req.body, null, 2));

      const driver = await setupWebDriver();
      const results = await runTest(
        driver,
        req.body.instructions,
        req.body.url
      );
      res.status(200).json({ results }); // Enviar resultados al cliente
      console.log("Resultados enviados");
      console.log(results);
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
