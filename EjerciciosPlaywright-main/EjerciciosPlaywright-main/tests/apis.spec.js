const { test, expect, request } = require('@playwright/test');

test('Consulta a API de usuarios', async () => {
 const api = await request.newContext();
 const response = await api.get('https://reqres.in/api/users/2');
 expect(response.status()).toBe(200);
 const body = await response.json();
 expect(body.data.email).toBe('janet.weaver@reqres.in');
});
