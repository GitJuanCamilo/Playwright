const { test, expect } = require('@playwright/test');

test('Leer tabla', async ({ page }) => {
 await page.goto('https://www.w3schools.com/html/html_tables.asp');
 const rows = await page.locator('#customers tr').all();
 for (let row of rows) {
   const text = await row.innerText();
   console.log(text);
 }
});