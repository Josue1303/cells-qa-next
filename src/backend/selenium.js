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

async function runTest(driver) {
  try {
    await driver.get(
      "https://admin:admin@the-internet.herokuapp.com/basic_auth"
    ); // Navegar a una URL
    // Ejemplo de pasos de prueba:
    // Iniciar sesión
    title = await driver.getTitle();
    let successMessage = await driver.findElement(By.css(".example p"));

    // Verify the success message
    let expectedMessage =
      "Congratulations! You must have the proper credentials.";

    if ((await successMessage.getText()) === expectedMessage) {
      console.log("Test scenario passed!");
    } else {
      console.log(
        "Test scenario failed: Success message does not match the expected message."
      );
    }
    console.log("Prueba completada con éxito.");
  } catch (error) {
    console.error("Error al ejecutar la prueba:", error);
    throw error;
  } finally {
  }
}

module.exports = { setupWebDriver, runTest };
