// Importa los objetos necesarios de Playwright Test
const { test, expect } = require('@playwright/test');
test('abrir página y verificar título', async ({ page }) => {

 // Abre la página oficial de Playwright
 await page.goto('https://playwright.dev');

 // Verifica que el título contenga "Playwright"
 await expect(page).toHaveTitle(/Playwright/);
 
 // Toma una captura de pantalla
 await page.screenshot({ path: 'captura.png' });
});