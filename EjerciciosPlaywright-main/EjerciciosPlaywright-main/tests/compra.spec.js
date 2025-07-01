const { test, expect } = require('@playwright/test');

test('login y compra completa en saucedemo.com', async ({ page }) => {

  // Abrir la página
  await page.goto('https://www.saucedemo.com');

  //  Login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Validar URL después del login
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  //  Agregar producto al carrito (Backpack)
  await page.click('#add-to-cart-sauce-labs-backpack');

  //  Ir al carrito
  await page.click('.shopping_cart_link');

  // Validar que el producto esté en el carrito
  await expect(page.locator('.cart_item')).toHaveCount(1);

  //  Ir a checkout
  await page.click('#checkout');

  // Llenar formulario de compra
  await page.fill('#first-name', 'Juan');
  await page.fill('#last-name', 'Pérez');
  await page.fill('#postal-code', '12345');

  //Continuar y finalizar compra
  await page.click('#continue');
  await page.click('#finish');

  //Validar compra completada
  const mensaje = page.locator('h2.complete-header');
  await expect(mensaje).toHaveText('Thank you for your order!');

  // Captura de pantalla final
  await page.screenshot({ path: 'compra_exitosa.png', fullPage: true });

});
