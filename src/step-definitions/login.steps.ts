import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../config/env';

Given('I am on the Demo Web Shop login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open();
});

When('I log in with valid credentials', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(config.loginEmail, config.loginPassword);
});

Then('I should be logged in successfully', async function (this: CustomWorld) {
  await expect(
    this.page.locator('.account').filter({ hasText: config.loginEmail })
  ).toBeVisible({ timeout: 10000 });
});

// Then('I should be logged in successfully', async function (this: CustomWorld) {
//   // After a successful login, Demo Web Shop shows the account email in the header.
//   await expect(this.page.locator('.account')).toContainText(config.loginEmail, { timeout: 10000 });
// });
