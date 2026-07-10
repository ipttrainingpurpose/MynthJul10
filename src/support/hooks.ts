import { Before, After, AfterStep, Status, ITestCaseHookParameter } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from '@playwright/test';
import { CustomWorld } from './world';
import { config } from '../config/env';
import { setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(60 * 1000);
Before(async function (this: CustomWorld) {
  const browserType = { chromium, firefox, webkit }[config.browser];

  this.browser = await browserType.launch({
    headless: config.headless,
    slowMo: config.slowMo
  });

  this.context = await this.browser.newContext({
    viewport: null,
    acceptDownloads: true
  });
  this.context.setDefaultTimeout(config.defaultTimeout);

  this.page = await this.context.newPage();
});

// Equivalent of the original ExtentReports screenshot-on-failure / step logging
AfterStep(async function (this: CustomWorld, { result }: ITestCaseHookParameter) {
  if (result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
});

After(async function (this: CustomWorld) {
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});
