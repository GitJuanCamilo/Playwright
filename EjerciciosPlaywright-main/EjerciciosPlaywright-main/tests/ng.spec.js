const { test, expect } = require('@playwright/test');

test('Abrir página en modo incógnito', async ({ browser }) => {
 // Creamos un nuevo contexto (modo incógnito)
 const context = await browser.newContext();
 // Creamos una nueva página dentro del contexto privado
 const page = await context.newPage();
 // Navegamos a una página de prueba
 await page.goto('https://example.com');
 // Tomamos una captura de pantalla para verificar que cargó
 await page.screenshot({ path: 'modo_incognito.png' });
 // Cierre automático al final del test
});