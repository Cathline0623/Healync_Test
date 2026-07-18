import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { loginData } from '../testdata/users.js';

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {

    const apiFailures = [];

    page.on('response', async (response) => {
      if (response.status() >= 400) {
        apiFailures.push({
          url: response.url(),
          method: response.request().method(),
          status: response.status()
        });
      }
    });

    // Common Login
    const loginPage = new LoginPage(page);

    await loginPage.login(
      loginData.username,
      loginData.password
    );

    await use(page);

    if (apiFailures.length > 0) {
      await testInfo.attach('API Failures', {
        body: JSON.stringify(apiFailures, null, 2),
        contentType: 'application/json'
      });
    }
  }
});