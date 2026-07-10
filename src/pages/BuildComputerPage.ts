import { Page } from '@playwright/test';

export class BuildComputerPage {
  constructor(private page: Page) {}

  private processorFastOption = () => this.page.locator('#product_attribute_74_5_26_82');
  private ram8GbOption = () => this.page.locator('#product_attribute_74_6_27_85');
  private hdd400GbOption = () => this.page.locator('#product_attribute_74_3_28_87');
  private softwareOfficeOption = () => this.page.locator('#product_attribute_74_8_29_90');
  private quantityInput = () => this.page.locator('#addtocart_74_EnteredQuantity');
  private addToCartButton = () => this.page.locator('#add-to-cart-button-74');
  private notificationCloseButton = () => this.page.locator("span[title='Close']");

  async selectProcessor(): Promise<void> {
    await this.processorFastOption().click();
  }

  async selectRam(): Promise<void> {
    await this.ram8GbOption().click();
  }

  async selectHdd(): Promise<void> {
    await this.hdd400GbOption().click();
  }

  async selectSoftware(): Promise<void> {
    await this.softwareOfficeOption().scrollIntoViewIfNeeded();
    await this.softwareOfficeOption().click();
  }

  async setQuantity(quantity: string): Promise<void> {
    await this.quantityInput().fill(quantity);
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton().scrollIntoViewIfNeeded();
    await this.addToCartButton().click();
  }

  /** Closes the "Added to cart" bar-notification popup, if it appears (mirrors the WebDriverWait try/catch in validloginPOM.java). */
  async closeAddedToCartNotificationIfPresent(): Promise<void> {
    try {
      await this.notificationCloseButton().click({ timeout: 10000 });
    } catch {
      // Notification did not appear or was not clickable in time - safe to continue,
      // matching the original Selenium try/catch behavior.
    }
  }

  async configureAndAddToCart(quantity: string): Promise<void> {
    await this.selectProcessor();
    await this.selectRam();
    await this.selectHdd();
    await this.selectSoftware();
    await this.setQuantity(quantity);
    await this.addToCart();
    await this.closeAddedToCartNotificationIfPresent();
  }
}
