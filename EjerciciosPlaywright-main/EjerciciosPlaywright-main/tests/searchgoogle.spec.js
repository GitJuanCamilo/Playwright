// Genera un error, por tema de google y la detencion de bots
const { test, expect } = require('@playwright/test');

test('Buscar en Google', async ({ page }) => {
 await page.goto('https://www.google.com', { timeout: 60000});
 await page.waitForSelector('input[name="q"]');
  await page.fill('input[name="q"]', 'Playwright testing');
 await page.keyboard.press('Enter');
 await expect(page.locator('#search')).toBeVisible();
});