import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { CustomWorld } from '../support/world';
import { HomePage } from '../pages/HomePage';

let menuItemCount = 0;

Given('I am on the Demo Web Shop home page', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.open();
});

When('I inspect the top navigation menu', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  const menuTexts = await homePage.getMenuItemTexts();
  menuTexts.forEach((text) => console.log(text));

  menuItemCount = await homePage.getMenuItemCount();
  console.log(`Total number of menu items: ${menuItemCount}`);
});

Then('the menu should contain at least 1 item', async function () {
  expect(menuItemCount).toBeGreaterThan(0);
});

Then('a screenshot of the home page should be captured', async function (this: CustomWorld) {
  const screenshotsDir = path.join(process.cwd(), 'screenshots');
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const homePage = new HomePage(this.page);
  await homePage.captureHomepageScreenshot(path.join(screenshotsDir, 'demo_webshop_home.png'));
});
