const fs = require('fs');
const csv = require('csv-parser');
const { test, expect } = require('@playwright/test');
function leerDatosCSV(ruta) {
 return new Promise((resolve, reject) => {
   const resultados = [];
   fs.createReadStream(ruta)
     .pipe(csv())
     .on('data', (data) => resultados.push(data))
     .on('end', () => resolve(resultados))
     .on('error', reject);
 });
}
let datos = [];
test.describe('Compra con datos desde CSV', () => {
 // Cargar CSV antes de todos los tests
 test.beforeAll(async () => {
   datos = await leerDatosCSV('./data/datos.csv');
 });
 // Ejecutar un test por cada fila del CSV
 test('Ejecución por cada fila del CSV', async ({ page }) => {
   for (const fila of datos) {
     console.log(`Probando con usuario: ${fila.usuario}`);
     // Paso 1: Ir al sitio
     await page.goto('https://www.saucedemo.com');
     // Paso 2: Login
     await page.fill('#user-name', fila.usuario);
     await page.fill('#password', fila.contrasena);
     await page.click('#login-button');
     // Paso 3: Verificar login exitoso
     await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
     // Paso 4: Agregar producto
     await page.click('#add-to-cart-sauce-labs-backpack');
     // Paso 5: Ir al carrito
     await page.click('.shopping_cart_link');
     await expect(page.locator('.cart_item')).toHaveCount(1);
     // Paso 6: Checkout
     await page.click('#checkout');
     await page.fill('#first-name', fila.nombre);
     await page.fill('#last-name', fila.apellido);
     await page.fill('#postal-code', fila.codigo_postal);
     await page.click('#continue');
     await page.click('#finish');
     // Paso 7: Verificar compra exitosa
     await expect(page.locator('h2.complete-header')).toHaveText('Thank you for your order!');
     // Captura de pantalla
     await page.screenshot({ path: `compra_${fila.usuario}.png`, fullPage: true });
   }
 });
});