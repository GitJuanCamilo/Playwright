// Tiene errores 

const { test, expect } = require('@playwright/test');
test('Buscar en DuckDuckGo', async ({ page }) => {
 await page.goto('https://duckduckgo.com/');
 await page.fill('input[name="q"]', 'Playwright testing');
 await page.keyboard.press('Enter');
 await page.waitForURL('**/?q=*');
 const resultsSelector = '.react-results--main .results_links';
 await page.waitForSelector(resultsSelector, { timeout: 10000 });
 const results = page.locator(resultsSelector);
 await expect(results.first()).toBeVisible();
});