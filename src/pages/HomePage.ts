import { Page } from '@playwright/test';
import { config } from '../config/env';

export class HomePage {
  constructor(private page: Page) {}

  private topMenuItems = () => this.page.locator('.top-menu > li');
  private buildOwnComputerLink = () =>
    this.page.getByRole('link', { name: 'Build your own expensive computer', exact: true });
  private shoppingCartSpanLink = () => this.page.locator("span:text('Shopping cart')");
  //private shoppingCartTextLink = () => this.page.getByRole('link', { name: 'Shopping cart' });
  
  //private shoppingCartTextLink = () => this.page.locator("a.ico-cart[href='/cart']:visible");
  private shoppingCartTextLink = () => this.page.locator("a.ico-cart[href='/cart']:visible").first();
  private goToCartButton = () => this.page.locator("input[value='Go to cart']");

  async open(): Promise<void> {
    await this.page.goto(`${config.baseUrl}/`);
  }

  async getMenuItemTexts(): Promise<string[]> {
    return this.topMenuItems().allInnerTexts();
  }

  async getMenuItemCount(): Promise<number> {
    return this.topMenuItems().count();
  }

  async captureHomepageScreenshot(path: string): Promise<void> {
    await this.page.screenshot({ path, fullPage: true });
  }

  async clickBuildYourOwnComputer(): Promise<void> {
    await this.buildOwnComputerLink().scrollIntoViewIfNeeded();
    await this.buildOwnComputerLink().click();
  }

  /** Directly click the "Shopping cart" link and navigate to the cart page. */
  async goToShoppingCartDirect(): Promise<void> {
    await this.shoppingCartTextLink().click();
  }

  /** Hover over "Shopping cart" and click "Go to cart" in the dropdown (mirrors HoverAndClick.java / validloginPOM.java).
   *  Note: the flyout only renders the "Go to cart" button when the cart already contains at least one item. */
  async hoverShoppingCartAndGoToCart(): Promise<void> {
    const cartLink = this.shoppingCartSpanLink();
    await cartLink.scrollIntoViewIfNeeded();
    await cartLink.hover();
    const goToCart = this.goToCartButton();

     try {
    await goToCart.waitFor({ state: 'visible', timeout: 5000 });
    await goToCart.click();
  } catch {
    await this.shoppingCartTextLink().click();
  }


    // await goToCart.waitFor({ state: 'visible', timeout: 15000 });
    // await goToCart.click();
  }
}
