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

async function runTest(driver, email, password) {
  try {
    await driver.get("https://facebook.com"); // Navegar a una URL
    // Ejemplo de pasos de prueba:

    console.log(email);
    console.log(password);
    // Iniciar sesión
    const emailTextBox = await driver.findElement(By.name("email"));
    await emailTextBox.sendKeys(email);

    const passwordTextBox = await driver.findElement(By.name("pass"));
    await passwordTextBox.sendKeys(password);

    const loginButton = await driver.findElement(By.name("login"));
    await loginButton.click();

    console.log("Prueba completada con éxito.");
  } catch (error) {
    console.error("Error al ejecutar la prueba:", error);
    throw error;
  }
}

module.exports = { setupWebDriver, runTest };
