const { Builder, By, Key, until } = require('selenium-webdriver');
const levenshtein = require('fast-levenshtein');
const chrome = require('selenium-webdriver/chrome');

async function setupWebDriver() {
    const options = new chrome.Options();
    // Uncomment to run headless if needed
    // options.addArguments('headless');
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    return driver;
}

async function findElementWithFallbacks(driver, searchBy, searchKey) {
    const basicSelectors = [
        { by: searchBy, value: searchKey },
        { by: 'id', value: searchKey },
        { by: 'css', value: `.${searchKey}` },
        { by: 'css', value: `#${searchKey}` },
        { by: 'name', value: searchKey },
        { by: 'xpath', value: `//*[@id="${searchKey}"]` },
        { by: 'xpath', value: `//*[@class="${searchKey}"]` },
        { by: 'xpath', value: `//*[@name="${searchKey}"]` },
        { by: 'css', value: `[name="${searchKey}"]` },
        { by: 'css', value: `[class*="${searchKey}"]` },
        { by: 'css', value: `[id*="${searchKey}"]` },
        { by: 'xpath', value: `//*[contains(@class, "${searchKey}")]` },
        { by: 'xpath', value: `//*[contains(@id, "${searchKey}")]` },
        { by: 'xpath', value: `//*[contains(@name, "${searchKey}")]` },
        { by: 'xpath', value: `//*[contains(text(), "${searchKey}")]` },
        { by: 'css', value: `[class^="${searchKey}"]` },
        { by: 'css', value: `[id^="${searchKey}"]` },
        { by: 'css', value: `[name^="${searchKey}"]` },
        { by: 'css', value: `[class$="${searchKey}"]` },
        { by: 'css', value: `[id$="${searchKey}"]` },
        { by: 'css', value: `[name$="${searchKey}"]` },
        { by: 'xpath', value: `//*[@*="${searchKey}"]` },
        { by: 'xpath', value: `//*[contains(@*, "${searchKey}")]` }
    ];

    for (const selector of basicSelectors) {
        try {
            let element = await driver.findElement(By[selector.by](selector.value));
            console.log(`Found element with selector: ${selector.by} = ${selector.value}`);
            return element;
        } catch (error) {
            console.log(`Failed with selector: ${selector.by} = ${selector.value}`);
        }
    }

    const elements = await driver.findElements(By.css('*'));
    for (const element of elements) {
        const id = await element.getAttribute('id');
        const className = await element.getAttribute('class');
        const name = await element.getAttribute('name');
        let text = await element.getText();
        
        // Normalize text by removing extra whitespace
        text = text.replace(/\s+/g, ' ').trim();

        // Substring matching
        if (id && id.includes(searchKey) || className && className.includes(searchKey) || name && name.includes(searchKey) || text && text.includes(searchKey)) {
            console.log(`Found element with substring matching: ${searchKey}`);
            return element;
        }

        // Regular expression matching
        const regex = new RegExp(searchKey, 'i');
        if (id && regex.test(id) || className && regex.test(className) || name && regex.test(name) || text && regex.test(text)) {
            console.log(`Found element with regular expression matching: ${searchKey}`);
            return element;
        }

        // Levenshtein distance
        if (id && levenshtein.get(searchKey, id) <= 5 || className && levenshtein.get(searchKey, className) <= 5 || name && levenshtein.get(searchKey, name) <= 5 || text && levenshtein.get(searchKey, text) <= 5) {
            console.log(`Found element with Levenshtein distance: ${searchKey}`);
            return element;
        }
    }

    throw new Error(`Element not found using any method: ${searchKey}`);
}

async function runTest(driver, instructions, url) {
    await driver.get(url);
    
    const results = [];
    
    for (const instruction of instructions) {
        const { action, searchBy, searchKey, textInput } = instruction;

        try {
            const element = await findElementWithFallbacks(driver, searchBy, searchKey);
            if (action === 'sendKeys') {
                await element.sendKeys(textInput);
                results.push('Passed');
            } else if (action === 'click') {
                await element.click();
                results.push('Passed');
            } else if (action === 'getText') {
                const text = await element.getText();
                if (text.trim() === textInput.trim()) {
                    results.push('Passed');
                } else {
                    results.push('Failed');
                }
            }
        } catch (error) {
            console.error(`Error performing action: ${action}`, error);
            results.push('Failed');
        }
    }
    
    return results;
}

module.exports = {
    setupWebDriver,
    runTest
};
