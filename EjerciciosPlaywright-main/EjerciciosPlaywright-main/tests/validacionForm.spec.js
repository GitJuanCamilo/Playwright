// Error
const { test, expect } = require('@playwright/test');

test('Formulario con validaciones de errores', async ({ page }) => {
 await page.goto('https://demoqa.com/automation-practice-form');
 // Enviar sin completar nada
 await page.click('#submit');
 // Validaciones visibles
 await expect(page.locator('#firstName:invalid')).toBeVisible();
 await expect(page.locator('#lastName:invalid')).toBeVisible();
 await expect(page.locator('#userEmail:invalid')).toBeVisible();
 // Completar con email mal formado
 await page.fill('#userEmail', 'correo-invalido');
 await expect(page.locator('#userEmail:invalid')).toBeVisible();
});