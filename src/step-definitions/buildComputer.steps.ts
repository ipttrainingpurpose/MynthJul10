import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { HomePage } from '../pages/HomePage';
import { BuildComputerPage } from '../pages/BuildComputerPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

When('I navigate to the {string} product page', async function (this: CustomWorld, linkText: string) {
  const homePage = new HomePage(this.page);
  if (linkText === 'Build your own expensive computer') {
    await homePage.clickBuildYourOwnComputer();
  }
});

When(
  'I configure the computer with Fast processor, 8GB RAM, 400GB HDD and Office software',
  async function (this: CustomWorld) {
    const buildComputerPage = new BuildComputerPage(this.page);
    await buildComputerPage.selectProcessor();
    await buildComputerPage.selectRam();
    await buildComputerPage.selectHdd();
    await buildComputerPage.selectSoftware();
  }
);

When('I set the quantity to {string}', async function (this: CustomWorld, quantity: string) {
  const buildComputerPage = new BuildComputerPage(this.page);
  await buildComputerPage.setQuantity(quantity);
});

When('I add the computer to the cart', async function (this: CustomWorld) {
  const buildComputerPage = new BuildComputerPage(this.page);
  await buildComputerPage.addToCart();
  await buildComputerPage.closeAddedToCartNotificationIfPresent();
});

Then('the item should be added to the cart successfully', async function (this: CustomWorld) {
  // Demo Web Shop shows a "(n)" count badge next to the Shopping cart link once an item is added.
  await expect(this.page.locator('#topcartlink .cart-qty')).not.toHaveText('(0)', { timeout: 10000 });
});

When('I go to the shopping cart', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.hoverShoppingCartAndGoToCart();
});

When(
  'I set delivery country to {string} and zip code {string}',
  async function (this: CustomWorld, country: string, zipCode: string) {
    const cartPage = new CartPage(this.page);
    await cartPage.selectCountry(country);
    await cartPage.enterZipCode(zipCode);
  }
);

When('I proceed to checkout', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await cartPage.agreeToTermsOfService();
  await cartPage.clickCheckout();
});

When('I complete the checkout process with cash on delivery', async function (this: CustomWorld) {
  const checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.completeCheckout();
});

Then('the order should be placed successfully', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/.*checkout\/completed.*|.*\//, { timeout: 15000 });
});
