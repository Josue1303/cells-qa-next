// backend/selenium.js
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function setupWebDriver() {
  const options = new chrome.Options();
  // Configurar opciones de Chrome (opcional)
  // options.addArguments('--headless'); // Ejecutar en modo headless (sin interfaz gráfica)

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  return driver;
}

async function runTest(driver, parameters) {
  const { textInput, searchKey, searchBy, action } = parameters;

  try {
    await driver.get("https://facebook.com"); // Navegar a una URL
    // Ejemplo de pasos de prueba:
    // Dependiendo de la acción, realizar la acción correspondiente
    if (action === "sendKeys") {
      await driver.findElement(By[searchBy](searchKey)).sendKeys(textInput);
    } else if (action === "click") {
      await driver.findElement(By[searchBy](searchKey)).click();
    } else if (action === "getText") {
      const elementText = await driver
        .findElement(By[searchBy](searchKey))
        .getText();
      console.log("Texto del elemento:", elementText);
    } else {
      console.log("Acción no válida:", action);
    }

    console.log("Prueba completada con éxito.");
  } catch (error) {
    console.error("Error al ejecutar la prueba:", error);
    throw error;
  }
}

module.exports = { setupWebDriver, runTest };
