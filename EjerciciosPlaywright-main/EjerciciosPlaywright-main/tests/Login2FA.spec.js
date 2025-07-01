// Prueba de error
const { test, expect } = require('@playwright/test');

test('Login con segundo paso (2FA)', async ({ page }) => {
 await page.goto('https://example.com/login');
 
 await page.fill('#usuario', 'usuario_prueba');
 await page.fill('#password', 'contraseña_segura');
 await page.click('#btn-login');

 const codigo2FA = '123456'; // simulado para pruebas
 await expect(page.locator('#input-2fa')).toBeVisible();
 await page.fill('#input-2fa', codigo2FA);
 await page.click('#btn-verificar');
 
 await expect(page).toHaveURL(/dashboard|inicio/);
});