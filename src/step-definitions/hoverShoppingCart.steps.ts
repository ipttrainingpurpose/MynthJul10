import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { HomePage } from '../pages/HomePage';

When('I hover over the shopping cart link and click go to cart', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.hoverShoppingCartAndGoToCart();
});

Then('I should be navigated to the shopping cart page', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/.*\/cart.*/);
  
});
